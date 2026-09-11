import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Education } from "@/types/portafolio";

interface EducationTimelineProps {
  education: Education[];
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 h-full w-1 bg-primary/20 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

      <ol className="space-y-8">
        {education.map((item, index) => (
          <li
            key={item.id}
            className={`relative flex items-start md:items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div
              className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            >
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>

            <div className={`ml-16 md:w-5/12 ${index % 2 === 0 ? "md:ml-12 md:mr-auto" : "md:ml-auto md:mr-12"}`}>
              <Card className="group border-2 transition-[border-color,box-shadow] hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold text-primary">
                      {item.startDate}
                      {item.endDate && ` - ${item.endDate}`}
                    </span>
                    {item.isCurrent && <Badge variant="secondary">En curso</Badge>}
                    <Badge variant="outline">{item.type}</Badge>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-lg font-medium text-primary">{item.institution}</p>

                  {item.location && (
                    <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>{item.location}</span>
                    </p>
                  )}

                  {item.description && <p className="leading-relaxed text-muted-foreground">{item.description}</p>}
                </CardContent>
              </Card>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
