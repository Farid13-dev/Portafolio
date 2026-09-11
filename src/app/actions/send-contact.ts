"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { buildEmailHtml, buildEmailText, getInitials } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_SENDS = 3;
const WINDOW_MS = 5 * 60_000;
// Nadie rellena un mensaje válido en menos de 2,5 s: por debajo se trata como bot.
const MIN_FILL_TIME_MS = 2500;

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // 1. Validación primero: un intento inválido no consume cuota del rate limit.
  const parsed = contactSchema.safeParse({
    name: text(formData.get("name")),
    email: text(formData.get("email")),
    subject: text(formData.get("subject")),
    message: text(formData.get("message")),
    website: text(formData.get("website")),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  // 2. Anti-bots: honeypot relleno o formulario "completado" demasiado rápido → fingimos éxito sin enviar.
  const elapsed = Number(formData.get("elapsed"));
  if (parsed.data.website || !Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) {
    return { status: "success" };
  }

  // 3. Rate limit solo sobre envíos válidos: 3 correos cada 5 minutos por IP.
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip, MAX_SENDS, WINDOW_MS);
  if (!limit.success) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60_000));
    return {
      status: "error",
      message: `Ya enviaste ${MAX_SENDS} mensajes en poco tiempo. Puedes volver a intentarlo en ${minutes} min.`,
    };
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("CONTACT_EMAIL no está configurado");
    return { status: "error", message: "Error de configuración del servidor." };
  }

  const { name, subject, message } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const receivedAt = new Date().toLocaleString("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Bogota",
  });

  const { error } = await resend.emails.send({
    // onboarding@resend.dev solo entrega al dueño de la cuenta: en producción usa un dominio verificado
    from: process.env.CONTACT_FROM ?? "Portafolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `[Portafolio] ${subject}`,
    html: buildEmailHtml({ name, email, subject, message, receivedAt, initials: getInitials(name) }),
    text: buildEmailText({ name, email, subject, message, receivedAt }),
  });

  if (error) {
    console.error("Error de Resend:", error);
    return { status: "error", message: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }

  return { status: "success" };
}
