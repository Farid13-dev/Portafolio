import { ProfileSkeleton, ServicesSkeleton } from "@/components/portafolio/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto space-y-16 px-4 py-20" aria-busy="true" aria-label="Cargando contenido">
      <ProfileSkeleton />
      <ServicesSkeleton />
    </div>
  );
}
