"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { sectionAnchor, type SectionId } from "@/lib/navigation";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  section: SectionId;
};

/**
 * Enlace a una sección de la home (/#servicios).
 *
 * next/link llama a preventDefault() en todo enlace interno, así que el salto
 * nativo al fragmento nunca ocurre; y cuando la URL destino es idéntica a la
 * actual el router la descarta sin marcar ningún segmento como scrolleable, con
 * lo que el clic se queda sin efecto. Eso pasa justo después de volver desde una
 * página completa (la URL ya es /#servicios) o al repetir el clic en la sección
 * activa. Para ese único caso hacemos el scroll a mano.
 */
export function SectionLink({ section, onClick, ...props }: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Cmd/Ctrl/Shift+clic y clic central abren pestaña o ventana: no interceptar.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const { pathname, search, hash } = window.location;
    if (pathname !== "/" || search !== "" || hash !== `#${section}`) return;

    const target = document.getElementById(section);
    if (!target) return;

    event.preventDefault();
    // scrollIntoView respeta scroll-padding-top y prefers-reduced-motion (globals.css).
    target.focus({ preventScroll: true });
    target.scrollIntoView();
  };

  return <Link {...props} href={sectionAnchor(section)} onClick={handleClick} />;
}
