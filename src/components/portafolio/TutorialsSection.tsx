import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWrapper } from '@/components/ui/image-wrapper';
import { Tutorial, SectionHeaderData } from '@/hooks/use-portafolio-data';
import { BookOpen, Youtube, ExternalLink } from 'lucide-react';

interface TutorialsSectionProps {
  tutorials: Tutorial[];
  header?: SectionHeaderData;
  isFullPage?: boolean;
  onNavigate?: () => void;
}

export const TutorialsSection = memo(({ tutorials, header, isFullPage = false, onNavigate }: TutorialsSectionProps) => {
  return (
      <section className={isFullPage ? 'py-20' : 'py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={isFullPage ? 'text-5xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
              <span className="text-primary">{header?.title ?? 'Tutoriales'}</span>{!isFullPage && ' y Recursos'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {header?.description ?? 'Comparto conocimiento a través de tutoriales prácticos y guías paso a paso'}
            </p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={tutorial.id || index} className="overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl group">
              {tutorial.image && (
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <ImageWrapper
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary">{tutorial.category}</Badge>
                  <Badge variant="outline">{tutorial.level}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tutorial.title}
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  {tutorial.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                  {tutorial.youtubeUrl && (
                    <a
                      href={tutorial.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Youtube className="h-4 w-4" />
                      Ver en YouTube
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!isFullPage && onNavigate && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={onNavigate}>
              Ver Todos los Tutoriales
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

TutorialsSection.displayName = 'TutorialsSection';
