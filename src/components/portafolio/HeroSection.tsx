'use client';

import { memo, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWrapper } from '@/components/ui/image-wrapper';
import { Phone, Linkedin, Github, ChevronRight, User } from 'lucide-react';
import { Profile } from '@/hooks/use-portafolio-data';
import { buildWhatsappLink } from '@/lib/whatsapp';

interface HeroSectionProps {
  profile: Profile | undefined;
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection = memo(function HeroSection({ profile, scrollToSection }: HeroSectionProps) {
  // Memoizar techStack badges
  const techStackBadges = useMemo(() => {
    if (profile?.techStack && profile.techStack.length > 0) {
      return profile.techStack.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
            {tech}
          </Badge>
      ));
    }
    return <p className="text-sm text-muted-foreground">Tecnologías cargando...</p>;
  }, [profile]);

  const whatsappLink = buildWhatsappLink(profile);

  // Memoizar enlaces sociales
  const socialLinks = useMemo(() => {
    const links: React.ReactNode[] = [];
    if (profile?.linkedin) {
      links.push(
          <a
              key="linkedin"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
      );
    }
    if (profile?.phone && whatsappLink) {
      links.push(
          <a
              key="phone"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="WhatsApp"
          >
            <Phone className="h-6 w-6" />
          </a>
      );
    }
    if (profile?.github) {
      links.push(
          <a
              key="github"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
      );
    }
    return links;
  }, [profile, whatsappLink]);

  return (
      <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary/20 overflow-hidden">
              {profile?.profileImage ? (
                  <ImageWrapper
                      src={profile.profileImage}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="w-full h-full"
                      loading="eager"
                      priority={true}
                  />
              ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/20">
                    <User className="h-16 w-16 text-primary" />
                  </div>
              )}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              {profile?.firstName || 'Oliver Farid'}
              <span className="block text-primary mt-2">{profile?.lastName || 'Rodríguez Morales'}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
              {profile?.title || 'Ingeniero de Software | Full Stack Developer'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {techStackBadges}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" onClick={() => scrollToSection('portafolio')}>
                Ver Portafolio
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contacto')}>
                Contactar
              </Button>
            </div>
            <div className="flex justify-center gap-6 text-muted-foreground">
              {socialLinks}
            </div>
          </div>
        </div>
      </section>
  );
});

HeroSection.displayName = 'HeroSection';