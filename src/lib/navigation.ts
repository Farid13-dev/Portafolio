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

export type FullPageSectionId = (typeof FULL_PAGE_SECTIONS)[number];

/**
 * Ancla de la sección dentro de la home.
 *
 * Siempre con "/" delante: desde una página completa (/servicios) el enlace
 * tiene que cambiar de documento, no solo de fragmento.
 */
export const sectionAnchor = (id: SectionId) => `/#${id}` as const;

/** Ruta de la página completa de una sección; el slug es el propio id. */
export const sectionRoute = (id: FullPageSectionId) => `/${id}` as const;
