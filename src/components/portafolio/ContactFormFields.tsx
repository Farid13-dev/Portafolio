"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { z } from "zod";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactField } from "@/components/portafolio/ContactField";
import { sendContact } from "@/app/actions/send-contact";
import {
  MESSAGE_MAX, MESSAGE_MIN, contactSchema,
  type ContactFieldErrors, type ContactState, type ContactValues,
} from "@/lib/contact-schema";

type FieldName = keyof ContactValues;

const FIELD_ORDER: FieldName[] = ["name", "email", "subject", "message"];
const EMPTY_VALUES: ContactValues = { name: "", email: "", subject: "", message: "" };
const ALL_TOUCHED: Record<FieldName, boolean> = { name: true, email: true, subject: true, message: true };
const initialState: ContactState = { status: "idle" };

// Misma regla que el servidor: aquí solo sirve para avisar antes de enviar.
function validate(values: ContactValues): ContactFieldErrors {
  const result = contactSchema.safeParse({ ...values, website: "" });
  return result.success ? {} : z.flattenError(result.error).fieldErrors;
}

const focusField = (name: FieldName) => document.getElementById(`contact-${name}`)?.focus();

// true solo tras hidratar: el HTML estático deja el botón activo para que el
// formulario siga funcionando aunque el JavaScript tarde en llegar.
const noopSubscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/**
 * Formulario de contacto: validación en vivo con el esquema compartido, botón
 * activo solo cuando todo es válido y envío mediante Server Action.
 */
export function ContactFormFields() {
  const hydrated = useHydrated();
  const mountedAt = useRef<number | null>(null);
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const [state, formAction, pending] = useActionState<ContactState, FormData>(async (prev, formData) => {
    // Tiempo desde que se mostró el formulario: el servidor descarta envíos "instantáneos" (bots)
    formData.set("elapsed", String(mountedAt.current ? Date.now() - mountedAt.current : 0));
    const result = await sendContact(prev, formData);
    if (result.status === "success") {
      setValues(EMPTY_VALUES);
      setTouched({});
    }
    return result;
  }, initialState);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Si el servidor devuelve errores de campo, lleva el foco al primero
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = FIELD_ORDER.find((field) => state.fieldErrors?.[field]?.length);
    if (first) focusField(first);
  }, [state]);

  const clientErrors = validate(values);
  const isValid = FIELD_ORDER.every((field) => !clientErrors[field]);
  const serverErrors: ContactFieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errorFor = (field: FieldName) => (touched[field] ? clientErrors[field]?.[0] : serverErrors[field]?.[0]);

  const update = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));
  const markTouched = (field: FieldName) => () => setTouched((current) => ({ ...current, [field]: true }));

  // Enter dentro de un campo también envía: si algo falta, mostramos los errores en vez de ir al servidor
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isValid) return;
    event.preventDefault();
    setTouched(ALL_TOUCHED);
    const first = FIELD_ORDER.find((field) => clientErrors[field]);
    if (first) focusField(first);
  };

  const submitDisabled = pending || (hydrated && !isValid);
  const showHint = hydrated && !pending && !isValid;

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot: fuera de la vista, del orden de tabulación y del árbol de accesibilidad */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">No rellenar</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ContactField id="contact-name" name="name" label="Nombre" autoComplete="name" placeholder="Tu nombre" maxLength={100}
        value={values.name} onChange={update("name")} onBlur={markTouched("name")} error={errorFor("name")} disabled={pending} />
      <ContactField id="contact-email" name="email" type="email" label="Email" autoComplete="email" placeholder="tu@email.com" maxLength={254}
        value={values.email} onChange={update("email")} onBlur={markTouched("email")} error={errorFor("email")} disabled={pending} />
      <ContactField id="contact-subject" name="subject" label="Asunto" placeholder="¿De qué quieres hablar?" maxLength={200}
        value={values.subject} onChange={update("subject")} onBlur={markTouched("subject")} error={errorFor("subject")} disabled={pending} />
      <ContactField id="contact-message" name="message" label="Mensaje" multiline maxLength={MESSAGE_MAX}
        placeholder="Cuéntame brevemente sobre tu proyecto, idea o necesidad…"
        hint={`Mínimo ${MESSAGE_MIN} caracteres`} counter={{ current: values.message.length, max: MESSAGE_MAX }}
        value={values.message} onChange={update("message")} onBlur={markTouched("message")} error={errorFor("message")} disabled={pending} />

      {state.status === "success" && (
        <p role="status" className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          ¡Mensaje enviado! Te responderé pronto.
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="space-y-2">
        <Button type="submit" size="lg" className="w-full" disabled={submitDisabled} aria-busy={pending}
          aria-describedby={showHint ? "contact-submit-hint" : undefined}>
          {pending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…</>
          ) : (
            <>Enviar mensaje <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" /></>
          )}
        </Button>
        {showHint && (
          <p id="contact-submit-hint" className="text-center text-xs text-muted-foreground">
            Completa todos los campos para enviar el mensaje.
          </p>
        )}
      </div>
    </form>
  );
}
