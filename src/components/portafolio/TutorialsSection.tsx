import Link from "next/link";
import { ArrowRight, BookOpen, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import type { SectionId } from "@/lib/navigation";
import type { SectionHeaderData, Tutorial } from "@/types/portafolio";

interface TutorialsSectionProps {
  tutorials: Tutorial[];
  header?: SectionHeaderData;
  id?: SectionId;
  isFullPage?: boolean;
  moreHref?: string;
}

export function TutorialsSection({ tutorials, header, id, isFullPage = false, moreHref }: TutorialsSectionProps) {
  const Heading = isFullPage ? "h1" : "h2";
  const titleId = `${id ?? "tutoriales"}-title`;
  const description = header?.description?.trim();
  const gridClass =
    tutorials.length <= 3
      ? "md:grid-cols-2 max-w-4xl"
      : tutorials.length <= 6
        ? "md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
        : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl";

  return (
    <section
      id={id}
      // tabIndex -1: al llegar por /#seccion, Next enfoca el destino del hash.
      // Sin esto el foco se queda en <body> y el lector de pantalla no se entera.
      tabIndex={id ? -1 : undefined}
      aria-labelledby={titleId}
      className={`${isFullPage ? "py-20" : "bg-linear-to-br from-primary/5 via-background to-primary/5 py-20"} focus:outline-none`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Heading id={titleId} className="mb-4 text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Tutoriales"}</span>
          </Heading>
          {description && <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{description}</p>}
        </div>

        {tutorials.length === 0 ? (
          <p className="text-center text-muted-foreground">Próximamente.</p>
        ) : (
          <div className={`mx-auto grid grid-cols-1 gap-6 ${gridClass}`}>
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="group overflow-hidden border-2 transition-[border-color,box-shadow] hover:border-primary hover:shadow-xl"
              >
                {tutorial.image && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <SafeImage
                      src={tutorial.image}
                      alt={tutorial.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <Badge variant="secondary">{tutorial.category}</Badge>
                    <Badge variant="outline">{tutorial.level}</Badge>
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">{tutorial.title}</CardTitle>
                  <CardDescription className="line-clamp-4 text-sm sm:line-clamp-3 sm:text-base">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      {tutorial.duration}
                    </p>
                    {tutorial.youtubeUrl && (
                      <a
                        href={tutorial.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        <Youtube className="h-4 w-4" aria-hidden="true" />
                        Ver en YouTube
                        <span className="sr-only">: {tutorial.title}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isFullPage && moreHref && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href={moreHref}>
                Ver todos los tutoriales
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
