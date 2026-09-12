import { ChevronRight, FileDown, Github, Linkedin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { buildWhatsappLink } from "@/lib/whatsapp";
import type { Profile } from "@/types/portafolio";

interface HeroSectionProps {
  profile: Profile | null;
}

const socialLinkClass =
  "inline-flex rounded-md p-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring";

export function HeroSection({ profile }: HeroSectionProps) {
  const firstName = profile?.firstName ?? "Oliver Farid";
  const lastName = profile?.lastName ?? "Rodríguez Morales";
  const whatsappLink = buildWhatsappLink(profile);

  return (
    <section
      id="inicio"
      // tabIndex -1: al llegar por /#seccion, Next enfoca el destino del hash.
      // Sin esto el foco se queda en <body> y el lector de pantalla no se entera.
      tabIndex={-1}
      aria-labelledby="inicio-title"
      // 100svh menos la altura del nav fijo: el primer pliegue no desborda
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/5 focus:outline-none"
    >
      <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 bg-primary/10">
          <SafeImage
            src={profile?.profileImage}
            alt={`Foto de ${firstName} ${lastName}`}
            fill
            sizes="128px"
            priority
            className="object-cover"
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-primary/20">
                <User className="h-16 w-16 text-primary" aria-hidden="true" />
              </div>
            }
          />
        </div>

        <h1 id="inicio-title" className="mb-4 text-5xl font-bold text-balance sm:text-6xl lg:text-7xl">
          {firstName}
          <span className="mt-2 block text-primary">{lastName}</span>
        </h1>
        <p className="mb-6 text-xl text-muted-foreground sm:text-2xl">
          {profile?.title ?? "Ingeniero de Software | Full Stack Developer"}
        </p>

        {profile && profile.techStack.length > 0 && (
          <ul className="mb-8 flex flex-wrap justify-center gap-3" aria-label="Tecnologías principales">
            {profile.techStack.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {/* Anclas nativas a propósito: el hero solo existe en la home, y un <a> con
              fragmento deja el salto en manos del navegador (sin JS y sin el caso
              muerto de next/link al repetir el mismo hash). */}
          <Button size="lg" asChild>
            <a href="#portafolio">
              Ver portafolio
              <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contacto">Contactar</a>
          </Button>
          {profile?.cvUrl && (
            <Button size="lg" variant="secondary" asChild>
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                Descargar CV
              </a>
            </Button>
          )}
        </div>

        <ul className="flex justify-center gap-2 text-muted-foreground" aria-label="Redes y contacto">
          {profile?.linkedin && (
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialLinkClass}>
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </li>
          )}
          {whatsappLink && (
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={socialLinkClass}>
                <Phone className="h-6 w-6" aria-hidden="true" />
              </a>
            </li>
          )}
          {profile?.github && (
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialLinkClass}>
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
