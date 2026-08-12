import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Education, SectionHeaderData } from '@/hooks/use-portafolio-data';
import { EducationTimeline } from './EducationTimeline';
import { ExternalLink } from 'lucide-react';

interface EducationSectionProps {
    education: Education[];
    header?: SectionHeaderData;
    isFullPage?: boolean;
    onNavigate?: () => void;
}

export const EducationSection = memo(({ education, header, isFullPage = false, onNavigate }: EducationSectionProps) => {
    return (
        <section className={isFullPage ? 'py-20' : 'py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <h1 className={isFullPage ? 'text-5xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
            Mi <span className="text-primary">{header?.title ?? 'Formación Académica'}</span>
    </h1>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {header?.description ?? 'Mi trayectoria educativa y formación continua'}
    </p>
    </div>

    <div className="max-w-4xl mx-auto">
    <EducationTimeline education={education} />
    </div>

    {!isFullPage && onNavigate && (
        <div className="text-center mt-12">
        <Button size="lg" variant="outline" onClick={onNavigate}>
        Ver Formación Completa
    <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        </div>
    )}
    </div>
    </section>
);
});

EducationSection.displayName = 'EducationSection';