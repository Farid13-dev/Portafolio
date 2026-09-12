import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import type { SectionId } from "@/lib/navigation";
import type { Project, SectionHeaderData } from "@/types/portafolio";

interface PortafolioSectionProps {
  projects: Project[];
  header?: SectionHeaderData;
  id?: SectionId;
  isFullPage?: boolean;
  moreHref?: string;
}

export function PortafolioSection({ projects, header, id, isFullPage = false, moreHref }: PortafolioSectionProps) {
  const Heading = isFullPage ? "h1" : "h2";
  const titleId = `${id ?? "portafolio"}-title`;
  const description = header?.description?.trim();
  const gridClass =
    projects.length <= 3
      ? "md:grid-cols-2 max-w-4xl"
      : projects.length <= 6
        ? "md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
        : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl";

  return (
    <section
      id={id}
      // tabIndex -1: al llegar por /#seccion, Next enfoca el destino del hash.
      // Sin esto el foco se queda en <body> y el lector de pantalla no se entera.
      tabIndex={id ? -1 : undefined}
      aria-labelledby={titleId}
      className={`${isFullPage ? "py-20" : "bg-background py-20"} focus:outline-none`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Heading id={titleId} className="mb-4 text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Portafolio"}</span>
          </Heading>
          {description && <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{description}</p>}
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">Próximamente.</p>
        ) : (
          <div className={`mx-auto grid grid-cols-1 gap-6 ${gridClass}`}>
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-2 transition-[border-color,box-shadow] hover:border-primary hover:shadow-xl"
              >
                <div className="relative aspect-[2.5/1] overflow-hidden bg-muted">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />
                </div>
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  {project.tags.length > 0 && (
                    <ul className="mb-3 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Ver en GitHub
                      <span className="sr-only">: {project.title}</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isFullPage && moreHref && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href={moreHref}>
                Ver todos los proyectos
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
