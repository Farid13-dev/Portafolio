import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Experience } from '@/hooks/use-portfolio-data';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ExternalLink } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
  isFullPage?: boolean;
  onNavigate?: () => void;
}

export const ExperienceSection = memo(({ experiences, isFullPage = false, onNavigate }: ExperienceSectionProps) => {
  return (
    <section className={isFullPage ? 'py-20' : 'py-20 bg-background'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={isFullPage ? 'text-5xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
            {isFullPage ? 'Mi ' : 'Mi '}<span className="text-primary">Experiencia{isFullPage ? ' Completa' : ''}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isFullPage
              ? 'Me gradué en el 2009, a partir de esa fecha he tenido la oportunidad de colaborar con varias empresas importantes.'
              : 'Me gradué en el 2009, a partir de esa fecha he tenido la oportunidad de colaborar con varias empresas importantes. Actualmente me encuentro trabajando en la SDAyR como Programador Web Full Stack.'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ExperienceTimeline experiences={experiences} />
        </div>

        {!isFullPage && onNavigate && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={onNavigate}>
              Ver Todas las Experiencias
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
