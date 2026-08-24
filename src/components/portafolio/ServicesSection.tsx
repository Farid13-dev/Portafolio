import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {Service, SectionHeaderData} from '@/hooks/use-portafolio-data';
import { Code, Layout, Smartphone, Server, Database, Cloud, Brain, CheckCircle2, ExternalLink } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  header?: SectionHeaderData;
  isFullPage?: boolean;
  onNavigate?: () => void;
}

// Icon mapping
const iconMap: Record<string, any> = {
  'Layout': Layout,
  'Smartphone': Smartphone,
  'Server': Server,
  'Database': Database,
  'Cloud': Cloud,
  'Code': Code,
  'Brain': Brain,
};

export const ServicesSection = memo(({ services, header, isFullPage = false, onNavigate }: ServicesSectionProps) => {
  return (
      <section className={isFullPage ? 'py-20' : 'py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={isFullPage ? 'text-5xl font-bold mb-4' : 'text-4xl font-bold mb-4'}>
              {isFullPage ? 'Todos Mis ' : ''}<span className="text-primary">{header?.title ?? 'Mis Servicios'}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {header?.description ?? 'Soluciones completas de desarrollo de software adaptadas a tus necesidades'}
            </p>
          </div>
          <div className={`grid grid-cols-1 gap-6 mx-auto ${
              services.length <= 2
                  ? 'md:grid-cols-2 max-w-3xl'
                  : services.length <= 4
                      ? 'md:grid-cols-2 max-w-4xl'
                      : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
          }`}>
            {services.map((service, index) => {
              const ServiceIcon = iconMap[service.icon] || Code;
              return (
                  <Card key={service.id || index} className="border-2 hover:border-primary transition-all hover:shadow-lg group h-full">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <ServiceIcon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                {feature}
                              </li>
                          ))}
                        </ul>
                      </CardContent>
                  </Card>
              );
            })}
          </div>

          {!isFullPage && onNavigate && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" onClick={onNavigate}>
                  Ver Todos los Servicios
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
          )}
        </div>
      </section>
  );
});

ServicesSection.displayName = 'ServicesSection';