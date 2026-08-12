'use client';

import { memo, useCallback, useMemo } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import { Profile } from '@/hooks/use-portafolio-data';
import { LogoImage } from '@/components/ui/image-wrapper';

interface NavigationProps {
  profile: Profile | undefined;
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'formacion', label: 'Formación Académica' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'tutoriales', label: 'Tutoriales' },
  { id: 'contacto', label: 'Contacto' }
];

export const Navigation = memo(function Navigation({ 
  profile, 
  activeSection, 
  isMenuOpen, 
  setIsMenuOpen, 
  scrollToSection 
}: NavigationProps) {
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, setIsMenuOpen]);

  const handleScrollToSection = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Cerrar menú móvil al hacer clic
  }, [scrollToSection, setIsMenuOpen]);

  // Memoizar contenido del menú desktop
  const desktopMenu = useMemo(() => (
    sections.map((section) => (
      <button
        key={section.id}
        onClick={() => handleScrollToSection(section.id)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeSection === section.id
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-primary hover:bg-accent'
        }`}
        aria-current={activeSection === section.id ? 'page' : undefined}
        aria-label={`Ir a ${section.label}`}
      >
        {section.label}
      </button>
    ))
  ), [activeSection, handleScrollToSection]);

  // Memoizar contenido del menú móvil
  const mobileMenu = useMemo(() => (
    sections.map((section) => (
      <button
        key={section.id}
        onClick={() => handleScrollToSection(section.id)}
        className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
          activeSection === section.id
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-primary hover:bg-accent'
        }`}
        role="menuitem"
        aria-label={`Ir a ${section.label}`}
      >
        {section.label}
      </button>
    ))
  ), [activeSection, handleScrollToSection]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" role="navigation" aria-label="Navegación principal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <a href="#inicio" className="flex items-center gap-3" aria-label="Ir a Inicio">
              {profile?.logoImage ? (
                <LogoImage
                  src={profile.logoImage}
                  alt="OliverFarid.ing Logo"
                  className="h-16 w-auto"
                  fallbackText="OliverFarid.ing"
                />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  OLIVER<span className="text-primary/60"> RODRIGUEZ</span>
                </span>
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              {desktopMenu}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-background" role="menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mobileMenu}
          </div>
        </div>
      )}
    </nav>
  );
});
