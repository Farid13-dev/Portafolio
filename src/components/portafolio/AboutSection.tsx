import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile, SectionHeaderData, SkillGroup } from "@/types/portafolio";

interface AboutSectionProps {
  profile: Profile | null;
  skills: SkillGroup[];
  header?: SectionHeaderData;
}

export function AboutSection({ profile, skills, header }: AboutSectionProps) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 id="sobre-mi-title" className="mb-12 text-center text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Sobre Mí"}</span>
          </h2>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{profile?.titleProfile ?? "Ingeniero de Sistemas"}</CardTitle>
              <CardDescription className="text-base">
                {profile?.location ?? "Florencia - Caquetá, Colombia"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {profile?.bio ??
                  "Soy un Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras y escalables. Con experiencia en desarrollo full stack, me especializo en construir aplicaciones web modernas que combinan rendimiento excepcional con experiencia de usuario intuitiva."}
              </p>

              {skills.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Code className="h-5 w-5 text-primary" aria-hidden="true" />
                    Habilidades Técnicas
                  </h3>
                  <ul className="flex flex-wrap justify-center gap-4">
                    {skills.map((skillGroup) => (
                      <li key={skillGroup.category} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]">
                        <Card className="h-full bg-accent/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{skillGroup.category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="flex flex-wrap gap-2">
                              {skillGroup.items.map((skill) => (
                                <li key={skill}>
                                  <Badge variant="secondary">{skill}</Badge>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
