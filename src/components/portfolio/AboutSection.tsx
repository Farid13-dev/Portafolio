'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Linkedin, Code } from 'lucide-react';
import { Profile, SkillGroup } from '@/hooks/use-portfolio-data';

interface AboutSectionProps {
  profile: Profile | undefined;
  skills: SkillGroup[];
}

export function AboutSection({ profile, skills }: AboutSectionProps) {
  return (
    <section id="sobre-mi" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Sobre <span className="text-primary">Mí</span>
          </h2>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Ingeniero de Sistemas</CardTitle>
              <CardDescription className="text-base">Florencia - Caquetá, Colombia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {profile?.bio || 'Soy un Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras y escalables. Con experiencia en desarrollo full stack, me especializo en construir aplicaciones web modernas que combinan rendimiento excepcional con experiencia de usuario intuitiva.'}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email || 'oliver1006507@gmail.com'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{profile?.phone || '57-302-543-1466'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="font-medium">{profile?.location || 'Florencia - Caquetá, Colombia'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    {profile?.linkedin ? (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Ver Perfil
                      </a>
                    ) : (
                      <span className="font-medium">No disponible</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Habilidades Técnicas
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {skills.map((skillGroup) => (
                    <Card key={skillGroup.category} className="bg-accent/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{skillGroup.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
