import { z } from "zod";

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;

// Única definición de reglas del formulario: el cliente la usa para avisar en vivo
// y el servidor para la validación real antes de enviar.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(100, "Máximo 100 caracteres"),
  email: z.email("Ingresa un email válido").max(254, "Máximo 254 caracteres"),
  subject: z.string().trim().min(5, "El asunto debe tener al menos 5 caracteres").max(200, "Máximo 200 caracteres"),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, `Cuéntame un poco más (mínimo ${MESSAGE_MIN} caracteres)`)
    .max(MESSAGE_MAX, `Máximo ${MESSAGE_MAX} caracteres`),
  website: z.string().optional(), // honeypot: debe llegar vacío
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactValues = Pick<ContactInput, "name" | "email" | "subject" | "message">;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };
