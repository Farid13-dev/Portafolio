export const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "experiencia", label: "Experiencia" },
  { id: "formacion", label: "Formación Académica" },
  { id: "portafolio", label: "Portafolio" },
  { id: "tutoriales", label: "Tutoriales" },
  { id: "contacto", label: "Contacto" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Secciones que además tienen página propia: /servicios, /experiencia, ... */
export const FULL_PAGE_SECTIONS = [
  "servicios",
  "experiencia",
  "formacion",
  "portafolio",
  "tutoriales",
] as const satisfies readonly SectionId[];
