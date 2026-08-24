import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWrapper } from '@/components/ui/image-wrapper';
import { Project, SectionHeaderData } from '@/hooks/use-portafolio-data';
import { Github, ExternalLink } from 'lucide-react';

interface PortfolioSectionProps {
  projects: Project[];
  header?: SectionHeaderData;
  isFullPage?: boolean;
  onNavigate?: () => void;
}

export const PortafolioSection = memo(({ projects, header, isFullPage = false, onNavigate }: PortfolioSectionProps) => {
  return (
      <section className={isFullPage ? 'py-20' : 'py-20 bg-background'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={isFullPage ? 'text-5xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
              <span className="text-primary">{header?.title ?? 'Portafolio'}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {header?.description ?? 'Proyectos destacados que demuestran mi experiencia y habilidades'}
            </p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl group">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <ImageWrapper
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base line-clamp-4 sm:line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" />
                    Ver en GitHub
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!isFullPage && onNavigate && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={onNavigate}>
              Ver Todos los Proyectos
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

PortafolioSection.displayName = 'PortafolioSection';
