"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { buildEmailHtml, buildEmailText, getInitials } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip, 3, 300_000); // 3 envíos cada 5 minutos por IP
  if (!limit.success) {
    return { status: "error", message: limit.message ?? "Demasiados intentos. Intenta más tarde." };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const { website: _website, ...values } = raw;
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  // Honeypot relleno: es un bot. Fingimos éxito sin enviar nada.
  if (parsed.data.website) return { status: "success" };

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("CONTACT_EMAIL no está configurado");
    return { status: "error", message: "Error de configuración del servidor." };
  }

  const { name, email, subject, message } = parsed.data;
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
