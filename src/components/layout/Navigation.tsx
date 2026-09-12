"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SectionLink } from "@/components/layout/SectionLink";
import { SECTIONS, type SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  logoImage: string | null;
}

export function Navigation({ logoImage }: NavigationProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");

  // Scroll-spy sin listener de scroll: el navegador avisa cuando una sección
  // cruza la franja central de la ventana.
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const { id } of SECTIONS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (id: SectionId) => isHome && activeSection === id;

  const linkClass = (id: SectionId, mobile = false) =>
    cn(
      "rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      mobile ? "block px-3 py-2 text-base" : "px-4 py-2 text-sm",
      isActive(id) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-primary",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Navegación principal" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="shrink-0" aria-label="Ir al inicio">
            {logoImage ? (
              <Image src={logoImage} alt="" width={160} height={64} priority className="h-16 w-auto" />
            ) : (
              <span className="text-2xl font-bold text-primary">
                OLIVER<span className="text-primary/60"> RODRIGUEZ</span>
              </span>
            )}
          </Link>

          <ul className="hidden items-center md:flex">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <SectionLink
                  section={id}
                  className={linkClass(id)}
                  aria-current={isActive(id) ? "location" : undefined}
                >
                  {label}
                </SectionLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-ring md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t bg-background md:hidden">
          <ul className="space-y-1 px-2 pb-3 pt-2">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <SectionLink
                  section={id}
                  className={linkClass(id, true)}
                  aria-current={isActive(id) ? "location" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
