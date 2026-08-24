import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Experience, SectionHeaderData  } from '@/hooks/use-portafolio-data';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ExternalLink } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
  header?: SectionHeaderData;
  isFullPage?: boolean;
  onNavigate?: () => void;
}

export const ExperienceSection = memo(({ experiences, header, isFullPage = false, onNavigate }: ExperienceSectionProps) => {
  return (
      <section className={isFullPage ? 'py-20' : 'py-20 bg-background'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={isFullPage ? 'text-4xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
              Mi <span className="text-primary">{header?.title ?? 'Experiencia'}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {header?.description ?? 'Me gradué en el 2025, a partir de esa fecha he tenido la oportunidad de colaborar con varias empresas importantes.'}
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
