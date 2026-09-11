import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  Code,
  Database,
  Layout,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionHeaderData, Service } from "@/types/portafolio";

interface ServicesSectionProps {
  services: Service[];
  header?: SectionHeaderData;
  /** id de ancla en la home; omitir en /servicios */
  id?: string;
  /** true en /servicios: el título es el h1 y no se muestra "Ver todos" */
  isFullPage?: boolean;
  moreHref?: string;
}

const iconMap: Record<string, LucideIcon> = { Layout, Smartphone, Server, Database, Cloud, Code, Brain };

export function ServicesSection({ services, header, id, isFullPage = false, moreHref }: ServicesSectionProps) {
  const Heading = isFullPage ? "h1" : "h2";
  const titleId = `${id ?? "servicios"}-title`;
  const gridClass =
    services.length <= 2
      ? "md:grid-cols-2 max-w-3xl"
      : services.length <= 4
        ? "md:grid-cols-2 max-w-4xl"
        : "md:grid-cols-2 lg:grid-cols-3 max-w-6xl";

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={isFullPage ? "py-20" : "bg-linear-to-br from-primary/5 via-background to-primary/5 py-20"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Heading id={titleId} className="mb-4 text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Mis Servicios"}</span>
          </Heading>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {header?.description ?? "Soluciones completas de desarrollo de software adaptadas a tus necesidades"}
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-muted-foreground">Próximamente.</p>
        ) : (
          <div className={`mx-auto grid grid-cols-1 gap-6 ${gridClass}`}>
            {services.map((service) => {
              const ServiceIcon = iconMap[service.icon] ?? Code;
              return (
                <Card
                  key={service.id}
                  className="group h-full border-2 transition-[border-color,box-shadow] hover:border-primary hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <ServiceIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isFullPage && moreHref && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href={moreHref}>
                Ver todos los servicios
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
