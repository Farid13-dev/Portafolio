"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContact } from "@/app/actions/send-contact";
import { MESSAGE_MAX, type ContactInput, type ContactState } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

/**
 * Formulario de contacto. Con useActionState funciona incluso sin JavaScript,
 * React limpia los campos tras un envío correcto y, si hay errores, el servidor
 * devuelve los valores para no perder lo escrito.
 */
export function ContactFormFields() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  return (
    <form action={formAction} noValidate className="space-y-4">
      {/* Honeypot: fuera de la vista, del orden de tabulación y del árbol de accesibilidad */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">No rellenar</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field name="name" label="Nombre" autoComplete="name" placeholder="Tu nombre"
             defaultValue={values.name} error={errors.name?.[0]} disabled={pending} />
      <Field name="email" type="email" label="Email" autoComplete="email" placeholder="tu@email.com"
             defaultValue={values.email} error={errors.email?.[0]} disabled={pending} />
      <Field name="subject" label="Asunto" placeholder="¿De qué quieres hablar?"
             defaultValue={values.subject} error={errors.subject?.[0]} disabled={pending} />
      <Field name="message" label="Mensaje" multiline maxLength={MESSAGE_MAX}
             placeholder="Cuéntame brevemente sobre tu proyecto, idea o necesidad…"
             defaultValue={values.message} error={errors.message?.[0]} disabled={pending} />

      {state.status === "success" && (
        <p role="status" className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          ¡Mensaje enviado! Te responderé pronto.
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending} aria-busy={pending}>
        {pending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…</>
        ) : (
          <>Enviar mensaje <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" /></>
        )}
      </Button>
    </form>
  );
}

interface FieldProps {
  name: keyof ContactInput;
  label: string;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
}

function Field({ name, label, type = "text", autoComplete, placeholder, defaultValue, error, disabled, multiline, maxLength }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    placeholder,
    defaultValue,
    disabled,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(error && "border-destructive focus-visible:ring-destructive", multiline && "h-32 resize-none"),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {multiline ? <Textarea {...shared} /> : <Input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1 flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}
