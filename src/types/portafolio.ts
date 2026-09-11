import type {
  Education as PrismaEducation,
  Experience as PrismaExperience,
  Profile as PrismaProfile,
  Project as PrismaProject,
  Service as PrismaService,
  Tutorial as PrismaTutorial,
} from "@prisma/client";

// Los tipos derivan del schema de Prisma (única fuente de verdad).
// Los campos guardados como JSON serializado se exponen ya parseados.
export type Profile = Omit<PrismaProfile, "techStack"> & { techStack: string[] };
export type Project = Omit<PrismaProject, "tags"> & { tags: string[] };
export type Service = Omit<PrismaService, "features"> & { features: string[] };
export type Experience = PrismaExperience;
export type Education = PrismaEducation;
export type Tutorial = PrismaTutorial;

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SectionHeaderData {
  title: string;
  description: string;
}

export type SectionHeaders = Record<string, SectionHeaderData>;
