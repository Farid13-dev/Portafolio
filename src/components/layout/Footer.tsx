'use client';

import {memo, useMemo} from 'react';
import {Mail, Linkedin, Github, Briefcase} from 'lucide-react';
import {Profile} from '@/hooks/use-portfolio-data';
import {LogoImage} from '@/components/ui/image-wrapper';

interface FooterProps {
    profile: Profile | undefined;
    scrollToSection: (sectionId: string) => void;
}

const sections = [
    {id: 'inicio', label: 'Inicio'},
    {id: 'servicios', label: 'Servicios'},
    {id: 'experiencia', label: 'Experiencia'},
    {id: 'portafolio', label: 'Portafolio'},
    {id: 'tutoriales', label: 'Tutoriales'},
    {id: 'contacto', label: 'Contacto'}
];

export const Footer = memo(function Footer({profile, scrollToSection}: FooterProps) {
    const year = useMemo(() => new Date().getFullYear(), []);

    // Memoizar enlaces sociales
    const socialLinks = useMemo(() => {
        const links: React.ReactElement[] = [];
        if (profile?.linkedin) {
            links.push(
                <a
                    key="linkedin"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                >
                    <Linkedin className="h-5 w-5 text-primary"/>
                </a>
            );
        }
        if (profile?.email) {
            links.push(
                <a
                    key="email"
                    href={`mailto:${profile.email}`}
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Email"
                >
                    <Mail className="h-5 w-5 text-primary"/>
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
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                >
                    <Github className="h-5 w-5 text-primary"/>
                </a>
            );
        }
        return links;
    }, [profile]);

    // Memoizar secciones del footer
    const sectionLinks = useMemo(() => (
        sections.map((section) => (
            <li key={section.id}>
                <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                >
                    {section.label}
                </button>
            </li>
        ))
    ), [scrollToSection]);

    return (
        <footer className="bg-muted/50 border-t mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {profile?.logoImage ? (
                                <LogoImage
                                    src={profile.logoImage}
                                    alt="Farid.ing Logo"
                                    className="h-16 w-auto"
                                    fallbackText="Farid.ing"
                                />
                            ) : (
                                <span className="text-2xl font-bold text-primary">
                  OF<span className="text-primary/60">RM</span>
                </span>
                            )}
                            <h3 className="text-xl font-bold">
                                {profile?.firstName || 'Oliver Farid'} <span
                                className="text-primary">{profile?.lastName || 'Rodríguez Morales'}</span>
                            </h3>
                        </div>
                        <p className="text-muted-foreground">
                            Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Secciones</h4>
                        <ul className="space-y-2">
                            {sectionLinks}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Conéctate</h4>
                        <div className="flex gap-4">
                            {socialLinks}
                        </div>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>© {year} {profile?.firstName || 'Oliver Farid'} {profile?.lastName || 'Rodríguez Morales'}. Todos
                        los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
});
