import { CheckCircle2, Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactFormFields } from "@/components/portafolio/ContactFormFields";
import { buildWhatsappLink } from "@/lib/whatsapp";
import type { Profile, SectionHeaderData } from "@/types/portafolio";

interface ContactSectionProps {
  profile: Profile | null;
  header?: SectionHeaderData;
}

/** "https://www.linkedin.com/in/usuario/" → "linkedin.com/in/usuario" */
const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const iconBoxClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10";
const linkClass = "text-muted-foreground transition-colors hover:text-primary break-all";

export function ContactSection({ profile, header }: ContactSectionProps) {
  const whatsappLink = buildWhatsappLink(profile);
  const description =
    header?.description ??
    "¿Hablamos?\nEstoy disponible para oportunidades laborales y proyectos de desarrollo backend.";

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 id="contacto-title" className="mb-4 text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Contáctame"}</span>
          </h2>
          <p className="mx-auto max-w-2xl whitespace-pre-line text-xl text-muted-foreground">
            {description.replace(/\n/g, "\n")}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {profile?.email && (
                    <li className="flex items-start gap-4">
                      <div className={iconBoxClass}><Mail className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a className={linkClass} href={`mailto:${profile.email}`}>{profile.email}</a>
                      </div>
                    </li>
                  )}
                  {profile?.phone && whatsappLink && (
                    <li className="flex items-start gap-4">
                      <div className={iconBoxClass}><Phone className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <a className={linkClass} href={whatsappLink} rel="noopener noreferrer" target="_blank">{profile.phone}</a>
                      </div>
                    </li>
                  )}
                  {profile?.linkedin && (
                    <li className="flex items-start gap-4">
                      <div className={iconBoxClass}><Linkedin className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <a className={linkClass} href={profile.linkedin} rel="noopener noreferrer" target="_blank">{prettyUrl(profile.linkedin)}</a>
                      </div>
                    </li>
                  )}
                  {profile?.github && (
                    <li className="flex items-start gap-4">
                      <div className={iconBoxClass}><Github className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                      <div>
                        <p className="font-medium">GitHub</p>
                        <a className={linkClass} href={profile.github} rel="noopener noreferrer" target="_blank">{prettyUrl(profile.github)}</a>
                      </div>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {profile?.availability !== false ? (
              <Card className="border-2 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Disponibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Actualmente disponible para proyectos freelance y oportunidades de empleo a tiempo completo.
                  </p>
                  <p className="mt-4 flex items-center gap-2 font-medium text-primary">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Disponible para nuevos proyectos
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Disponibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    Ahora mismo no estoy tomando nuevos proyectos, pero puedes escribirme y te respondo.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Envíame un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderé pronto</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactFormFields />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
