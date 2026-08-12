'use client';

import { Education } from '@/hooks/use-portafolio-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

interface EducationTimelineProps {
    education: Education[];
}

export function EducationTimeline({ education }: EducationTimelineProps) {
    return (
        <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20" />

            <div className="space-y-8">
                {education.map((item, index) => (
                    <div
                        key={item.id}
                        className={`relative flex items-start md:items-center ${
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                    >
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 shadow-lg">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>

                        <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-12' : 'md:ml-auto md:mr-12'}`}>
                            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-semibold text-primary">
                      {item.startDate}
                                            {item.endDate && ` - ${item.endDate}`}
                                            {item.isCurrent && (
                                                <Badge variant="secondary" className="ml-2">En curso</Badge>
                                            )}
                    </span>
                                        <Badge variant="outline">{item.type}</Badge>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-lg font-medium text-primary mb-2">
                                        {item.institution}
                                    </p>

                                    {item.location && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                            <MapPin className="h-4 w-4" />
                                            <span>{item.location}</span>
                                        </div>
                                    )}

                                    {item.description && (
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}