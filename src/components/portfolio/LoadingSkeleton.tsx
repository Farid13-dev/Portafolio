import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ServicesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="border-2">
          <CardHeader>
            <div className="w-12 h-12 bg-muted rounded-lg mb-4 animate-pulse" />
            <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden border-2">
          <div className="aspect-video bg-muted animate-pulse" />
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, j) => (
                <Badge key={j} variant="outline" className="w-16 h-6 bg-muted animate-pulse" />
              ))}
            </div>
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TutorialsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden border-2">
          <div className="aspect-video bg-muted animate-pulse" />
          <CardHeader>
            <div className="flex items-start justify-between mb-3">
              <Badge variant="secondary" className="w-16 h-6 bg-muted animate-pulse" />
              <Badge variant="outline" className="w-16 h-6 bg-muted animate-pulse" />
            </div>
            <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-16 animate-pulse" />
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 bg-muted rounded-full mb-6 animate-pulse" />
      <div className="h-12 bg-muted rounded w-96 mb-4 animate-pulse" />
      <div className="h-8 bg-muted rounded w-80 mb-8 animate-pulse" />
      <div className="flex flex-wrap gap-3 mb-12">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-24 h-10 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-accent/30">
          <CardHeader className="pb-3">
            <div className="h-5 bg-muted rounded w-1/2 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, j) => (
                <Badge key={j} variant="secondary" className="w-16 h-6 bg-muted animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
