import { useQuery } from '@tanstack/react-query';

// Types
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  logoImage?: string;
  techStack?: string[];
  availability: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  tags: string[];
  order: number;
  published: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  youtubeUrl?: string;
  image?: string;
  order: number;
  published: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  order: number;
  published: boolean;
}

// Configuración común optimizada
const queryConfig = {
  staleTime: 1000 * 60 * 10, // 10 minutos (aumentado para más caché)
  gcTime: 1000 * 60 * 30, // 30 minutos en caché
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false, // No recargar al cambiar de pestaña
  refetchOnReconnect: true, // Recargar al reconectar
};

// Profile Hook
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch('/api/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json() as Promise<Profile>;
    },
    ...queryConfig,
  });
}

// Services Hook
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      return response.json() as Promise<Service[]>;
    },
    ...queryConfig,
  });
}

// Projects Hook
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json() as Promise<Project[]>;
    },
    ...queryConfig,
  });
}

// Tutorials Hook
export function useTutorials() {
  return useQuery({
    queryKey: ['tutorials'],
    queryFn: async () => {
      const response = await fetch('/api/tutorials');
      if (!response.ok) {
        throw new Error('Failed to fetch tutorials');
      }
      return response.json() as Promise<Tutorial[]>;
    },
    ...queryConfig,
  });
}

// Skills Hook
export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await fetch('/api/skills');
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      return response.json() as Promise<SkillGroup[]>;
    },
    ...queryConfig,
  });
}

// Experiences Hook
export function useExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await fetch('/api/experiences');
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      return response.json() as Promise<Experience[]>;
    },
    ...queryConfig,
  });
}
