import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import type {
  Education,
  Experience,
  Profile,
  Project,
  SectionHeaders,
  Service,
  SkillGroup,
  Tutorial,
} from "@/types/portafolio";

// Campos guardados como JSON serializado en la BD (techStack, tags, features).
// Una fila corrupta no debe tumbar la página: se degrada a lista vacía.
function parseStringArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

const publishedInOrder = { where: { published: true }, orderBy: { order: "asc" as const } };

// cache() deduplica dentro de una misma petición: layout y page pueden pedir el perfil
// sin que se ejecute la consulta dos veces.
export const getProfile = cache(async (): Promise<Profile | null> => {
  const profile = await db.profile.findFirst();
  return profile ? { ...profile, techStack: parseStringArray(profile.techStack) } : null;
});

export const getServices = cache(async (): Promise<Service[]> => {
  const rows = await db.service.findMany(publishedInOrder);
  return rows.map((s) => ({ ...s, features: parseStringArray(s.features) }));
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await db.project.findMany(publishedInOrder);
  return rows.map((p) => ({ ...p, tags: parseStringArray(p.tags) }));
});

export const getTutorials = cache((): Promise<Tutorial[]> => db.tutorial.findMany(publishedInOrder));

export const getExperiences = cache((): Promise<Experience[]> => db.experience.findMany(publishedInOrder));

export const getEducation = cache((): Promise<Education[]> => db.education.findMany(publishedInOrder));

export const getSkills = cache(async (): Promise<SkillGroup[]> => {
  const categories = await db.skillCategory.findMany({
    include: { skills: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  return categories.map((c) => ({ category: c.name, items: c.skills.map((s) => s.name) }));
});

export const getSectionHeaders = cache(async (): Promise<SectionHeaders> => {
  const rows = await db.sectionHeader.findMany({ orderBy: { order: "asc" } });
  return Object.fromEntries(rows.map((h) => [h.key, { title: h.title, description: h.description }]));
});

export const getHomeData = cache(async () => {
  const [profile, services, projects, tutorials, skills, experiences, education, sectionHeaders] =
    await Promise.all([
      getProfile(),
      getServices(),
      getProjects(),
      getTutorials(),
      getSkills(),
      getExperiences(),
      getEducation(),
      getSectionHeaders(),
    ]);
  return { profile, services, projects, tutorials, skills, experiences, education, sectionHeaders };
});
