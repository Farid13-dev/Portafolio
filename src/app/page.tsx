'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  useProfile,
  useServices,
  useProjects,
  useTutorials,
  useSkills,
  useExperiences,
  useEducation,
  useSectionHeaders
} from '@/hooks/use-portafolio-data';

import { ServicesSection } from '@/components/portafolio/ServicesSection';
import { ExperienceSection } from '@/components/portafolio/ExperienceSection';
import { PortafolioSection } from '@/components/portafolio/PortafolioSection';
import { TutorialsSection } from '@/components/portafolio/TutorialsSection';
import { ContactForm } from '@/components/portafolio/ContactForm';
import { HeroSection } from '@/components/portafolio/HeroSection';
import { AboutSection } from '@/components/portafolio/AboutSection';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import {EducationSection} from "@/components/portafolio/EducationSection";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');


  // Fetch data from APIs
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: services = [], isLoading: isLoadingServices } = useServices();
  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();
  const { data: tutorials = [], isLoading: isLoadingTutorials } = useTutorials();
  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();
  const { data: experiences = [], isLoading: isLoadingExperiences } = useExperiences();
  const { data: education = [], isLoading: isLoadingEducation } = useEducation();
  const { data: sectionHeaders } = useSectionHeaders();
  const [returnToSection, setReturnToSection] = useState<string | null>(null);

  // Page navigation with query params - initialize from URL
  const [currentPage, setCurrentPage] = useState<'home' | 'servicios' | 'experiencia' | 'formacion' | 'portafolio' | 'tutoriales'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') as 'home' | 'servicios' | 'experiencia' | 'formacion' | 'portafolio' | 'tutoriales' | null;
      if (page && ['home', 'servicios', 'experiencia', 'formacion', 'portafolio', 'tutoriales'].includes(page)) {
        return page;
      }
    }
    return 'home';
  });

  const navigateToPage = (page: 'home' | 'servicios' | 'experiencia' | 'formacion' | 'portafolio' | 'tutoriales', fromSection?: string) => {
    const url = new URL(window.location.href);
    if (page === 'home') {
      url.searchParams.delete('page');
      setCurrentPage('home');

      if (returnToSection) {
        const sectionId = returnToSection;
        setReturnToSection(null);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('inicio');
      }

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    } else {
      url.searchParams.set('page', page);
      setCurrentPage(page);
      setReturnToSection(fromSection || page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.history.pushState({}, '', url);
  };

  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'formacion', label: 'Formación Académica' },
    { id: 'portafolio', label: 'Portafolio' },
    { id: 'tutoriales', label: 'Tutoriales' },
    { id: 'contacto', label: 'Contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    // If we're on a different page, navigate to home first
    if (currentPage !== 'home') {
      navigateToPage('home');
      // Wait for page to load then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update active section immediately
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      // If we're on home, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update active section immediately
        setActiveSection(sectionId);
      }
      setIsMenuOpen(false);
    }
  }, [currentPage, navigateToPage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-[100]"
      >
        Saltar al contenido principal
      </a>

      {/* Navigation */}
      <Navigation
        profile={profile}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        {/* Back to Home Button */}
        {currentPage !== 'home' && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button variant="outline" onClick={() => navigateToPage('home')}>
              ← Volver al Inicio
            </Button>
          </div>
        )}

        {/* Hero Section - Inicio */}
        {currentPage === 'home' && (
          <HeroSection profile={profile} scrollToSection={scrollToSection} />
        )}

        {/* About Section */}
        {currentPage === 'home' && (
          <AboutSection
              profile={profile}
              skills={skills}
              header={sectionHeaders?.['sobre-mi']}
          />
        )}

        {/* Services Section */}
        {currentPage === 'home' && (
          <section id="servicios">
            <ServicesSection
              services={services}
              header={sectionHeaders?.servicios}
              isFullPage={false}
              onNavigate={() => navigateToPage('servicios', 'servicios')}
            />
          </section>
        )}

        {/* Experience Section */}
        {currentPage === 'home' && (
          <section id="experiencia">
            <ExperienceSection
              experiences={experiences}
              header={sectionHeaders?.experiencia}
              isFullPage={false}
              onNavigate={() => navigateToPage('experiencia', 'experiencia')}
            />
          </section>
        )}

        {/* Education Section */}
        {currentPage === 'home' && (
            <section id="formacion">
              <EducationSection
                  education={education}
                  header={sectionHeaders?.formacion}
                  isFullPage={false}
                  onNavigate={() => navigateToPage('formacion', 'formacion')}
              />
            </section>
        )}

        {/* Portfolio Section */}
        {currentPage === 'home' && (
          <section id="portafolio">
            <PortafolioSection
              projects={projects}
              header={sectionHeaders?.portafolio}
              isFullPage={false}
              onNavigate={() => navigateToPage('portafolio', 'portafolio')}
            />
          </section>
        )}

        {/* Tutorials Section */}
        {currentPage === 'home' && (
          <section id="tutoriales">
            <TutorialsSection
              tutorials={tutorials}
              header={sectionHeaders?.tutoriales}
              isFullPage={false}
              onNavigate={() => navigateToPage('tutoriales', 'tutoriales')}
            />
          </section>
        )}

        {/* Contact Section */}
        {currentPage === 'home' && (
          <ContactForm
              profile={profile}
              header={sectionHeaders?.contacto}
          />
        )}
      </main>

      {/* Full Page Views */}
      {currentPage === 'servicios' && (
        <ServicesSection
          services={services}
          header={sectionHeaders?.servicios}
          isFullPage={true}
        />
      )}

      {currentPage === 'experiencia' && (
        <ExperienceSection
          experiences={experiences}
          header={sectionHeaders?.experiencia}
          isFullPage={true}
        />
      )}

      {currentPage === 'formacion' && (
          <EducationSection
              education={education}
              header={sectionHeaders?.formacion}
              isFullPage={true}
          />
      )}

      {currentPage === 'portafolio' && (
        <PortafolioSection
          projects={projects}
          header={sectionHeaders?.portafolio}
          isFullPage={true}
        />
      )}

      {currentPage === 'tutoriales' && (
        <TutorialsSection
          tutorials={tutorials}
          header={sectionHeaders?.tutoriales}
          isFullPage={true}
        />
      )}

      {/* Footer */}
      <Footer profile={profile} scrollToSection={scrollToSection} />
    </div>
  );
}
