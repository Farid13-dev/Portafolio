'use client';

import { Experience } from '@/hooks/use-portfolio-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Línea vertical */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20" />

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`relative flex items-start md:items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Punto en la línea */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 shadow-lg">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>

            {/* Tarjeta de experiencia */}
            <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-12' : 'md:ml-auto md:mr-12'}`}>
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  {/* Fecha */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {experience.startDate}
                      {experience.endDate && ` - ${experience.endDate}`}
                      {experience.isCurrent && (
                        <Badge variant="secondary" className="ml-2">
                          Actual
                        </Badge>
                      )}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>

                  {/* Empresa */}
                  <p className="text-lg font-medium text-primary mb-2">
                    {experience.company}
                  </p>

                  {/* Ubicación */}
                  {experience.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  )}

                  {/* Descripción */}
                  <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
