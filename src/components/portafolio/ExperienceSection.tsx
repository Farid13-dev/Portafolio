import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceTimeline } from "./ExperienceTimeline";
import type { Experience, SectionHeaderData } from "@/types/portafolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  header?: SectionHeaderData;
  id?: string;
  isFullPage?: boolean;
  moreHref?: string;
}

export function ExperienceSection({ experiences, header, id, isFullPage = false, moreHref }: ExperienceSectionProps) {
  const Heading = isFullPage ? "h1" : "h2";
  const titleId = `${id ?? "experiencia"}-title`;
  const description = header?.description?.trim();

  return (
    <section id={id} aria-labelledby={titleId} className={isFullPage ? "py-20" : "bg-background py-20"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Heading id={titleId} className="mb-4 text-4xl font-bold text-balance">
            <span className="text-primary">{header?.title ?? "Experiencia"}</span>
          </Heading>
          {description && <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{description}</p>}
        </div>

        <div className="mx-auto max-w-4xl">
          {experiences.length === 0 ? (
            <p className="text-center text-muted-foreground">Próximamente.</p>
          ) : (
            <ExperienceTimeline experiences={experiences} />
          )}
        </div>

        {!isFullPage && moreHref && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href={moreHref}>
                Ver todas las experiencias
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
