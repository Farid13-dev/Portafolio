import { z } from "zod";

// Única definición de reglas del formulario: la usan el cliente (mensajes) y el servidor (validación real).
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(100, "Máximo 100 caracteres"),
  email: z.email("Ingresa un email válido").max(254, "Máximo 254 caracteres"),
  subject: z.string().trim().min(5, "El asunto debe tener al menos 5 caracteres").max(200, "Máximo 200 caracteres"),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntame un poco más (mínimo 20 caracteres)")
    .max(5000, "Máximo 5000 caracteres"),
  website: z.string().optional(), // honeypot: debe llegar vacío
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;
export type ContactValues = Partial<Pick<ContactInput, "name" | "email" | "subject" | "message">>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors; values?: ContactValues };

export const MESSAGE_MAX = 5000;
