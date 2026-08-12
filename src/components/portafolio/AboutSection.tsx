'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { Profile, SkillGroup, SectionHeaderData } from '@/hooks/use-portafolio-data';

interface AboutSectionProps {
  profile: Profile | undefined;
  skills: SkillGroup[];
  header?: SectionHeaderData;
}

export function AboutSection({ profile, skills, header }: AboutSectionProps) {
  return (
    <section id="sobre-mi" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary">{header?.title ?? 'Sobre Mí'}</span>
          </h2>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{profile?.titleProfile || 'Ingeniero de Sistemas'}</CardTitle>
              <CardDescription className="text-base">{profile?.location || 'Florencia - Caquetá, Colombia'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {profile?.bio || 'Soy un Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras y escalables. Con experiencia en desarrollo full stack, me especializo en construir aplicaciones web modernas que combinan rendimiento excepcional con experiencia de usuario intuitiva.'}
              </p>

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
                          {skillGroup.items.map((skill, skillIndex) => (
                              <Badge key={`${skillGroup.category}-${skillIndex}-${skill}`} variant="secondary">
                                {skill}
                              </Badge>
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
