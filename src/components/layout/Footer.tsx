import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { SECTIONS } from "@/lib/navigation";
import type { Profile } from "@/types/portafolio";

interface FooterProps {
  profile: Profile | null;
}

const socialLinkClass =
  "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-ring";

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const firstName = profile?.firstName ?? "Oliver Farid";
  const lastName = profile?.lastName ?? "Rodríguez Morales";

  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              {profile?.logoImage ? (
                <SafeImage src={profile.logoImage} alt="" width={160} height={64} className="h-16 w-auto" />
              ) : null}
              <p className="text-xl font-bold">
                {firstName} <span className="text-primary">{lastName}</span>
              </p>
            </div>
            <p className="text-muted-foreground">
              {profile?.title ?? "Ingeniero de Sistemas enfocado en desarrollo backend y sistemas con IA."}
            </p>
          </div>

          <nav aria-labelledby="footer-sections">
            <h2 id="footer-sections" className="mb-4 font-semibold">Secciones</h2>
            <ul className="space-y-2">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <Link href={`/#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-semibold">Conéctate</h2>
            <ul className="flex gap-4">
              {profile?.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialLinkClass}>
                    <Linkedin className="h-5 w-5 text-primary" aria-hidden="true" />
                  </a>
                </li>
              )}
              {profile?.email && (
                <li>
                  <a href={`mailto:${profile.email}`} aria-label="Email" className={socialLinkClass}>
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  </a>
                </li>
              )}
              {profile?.github && (
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialLinkClass}>
                    <Github className="h-5 w-5 text-primary" aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>© {year} {firstName} {lastName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
