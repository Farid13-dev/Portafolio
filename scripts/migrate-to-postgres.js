/**
 * Script para migrar datos de SQLite a PostgreSQL
 *
 * Instrucciones:
 * 1. Crea una base de datos en Supabase/Neon
 * 2. Actualiza el .env con la nueva DATABASE_URL de PostgreSQL
 * 3. Ejecuta: bun run db:push
 * 4. Ejecuta este script: bun run scripts/migrate-to-postgres.js
 */

import { PrismaClient as PrismaSQLite } from '@prisma/client/sqlite';
import { PrismaClient as PrismaPostgres } from '@prisma/client/postgresql';

// Cliente SQLite (fuente)
const sqlite = new PrismaSQLite();

// Cliente PostgreSQL (destino)
const postgres = new PrismaPostgres();

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de SQLite a PostgreSQL...\n');

    // Migrar Profile
    console.log('📤 Migrando Profile...');
    const profiles = await sqlite.profile.findMany();
    if (profiles.length > 0) {
      await postgres.profile.createMany({
        data: profiles.map(p => ({
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          title: p.title,
          email: p.email,
          phone: p.phone,
          linkedin: p.linkedin,
          github: p.github,
          location: p.location,
          bio: p.bio,
          profileImage: p.profileImage,
          logoImage: p.logoImage,
          techStack: p.techStack,
          availability: p.availability,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })),
        skipDuplicates: true,
      });
      console.log(`✅ ${profiles.length} perfiles migrados`);
    }

    // Migrar Services
    console.log('📤 Migrando Services...');
    const services = await sqlite.service.findMany();
    if (services.length > 0) {
      await postgres.service.createMany({
        data: services,
        skipDuplicates: true,
      });
      console.log(`✅ ${services.length} servicios migrados`);
    }

    // Migrar Projects
    console.log('📤 Migrando Projects...');
    const projects = await sqlite.project.findMany();
    if (projects.length > 0) {
      await postgres.project.createMany({
        data: projects,
        skipDuplicates: true,
      });
      console.log(`✅ ${projects.length} proyectos migrados`);
    }

    // Migrar Tutorials
    console.log('📤 Migrando Tutorials...');
    const tutorials = await sqlite.tutorial.findMany();
    if (tutorials.length > 0) {
      await postgres.tutorial.createMany({
        data: tutorials,
        skipDuplicates: true,
      });
      console.log(`✅ ${tutorials.length} tutoriales migrados`);
    }

    // Migrar SkillCategories
    console.log('📤 Migrando SkillCategories...');
    const categories = await sqlite.skillCategory.findMany();
    if (categories.length > 0) {
      await postgres.skillCategory.createMany({
        data: categories,
        skipDuplicates: true,
      });
      console.log(`✅ ${categories.length} categorías migradas`);
    }

    // Migrar Skills
    console.log('📤 Migrando Skills...');
    const skills = await sqlite.skill.findMany();
    if (skills.length > 0) {
      await postgres.skill.createMany({
        data: skills,
        skipDuplicates: true,
      });
      console.log(`✅ ${skills.length} habilidades migradas`);
    }

    // Migrar Experiences
    console.log('📤 Migrando Experiences...');
    const experiences = await sqlite.experience.findMany();
    if (experiences.length > 0) {
      await postgres.experience.createMany({
        data: experiences,
        skipDuplicates: true,
      });
      console.log(`✅ ${experiences.length} experiencias migradas`);
    }

    console.log('\n🎉 Migración completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await sqlite.$disconnect();
    await postgres.$disconnect();
  }
}

migrate();
