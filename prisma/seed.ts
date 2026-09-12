// Datos de ejemplo para poblar una base de datos VACÍA.
//
// ⚠️ Este script es destructivo: hace upsert sobre Profile y borra sin condición
// todas las Skill y SkillCategory (además de servicios, proyectos y tutoriales
// con ids antiguos). No lo ejecutes contra una base de datos con contenido real.
//
// Toda la identidad de aquí es ficticia. El sitio NO lee este archivo en runtime:
// los datos que se muestran salen de la base de datos (src/lib/data.ts).

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ─────────────────────────────────────────────
  // Perfil
  // ─────────────────────────────────────────────
  const profileData = {
    firstName: 'Alex',
    lastName: 'Rivera',
    title: 'Ingeniero de Sistemas | Backend Developer',
    titleProfile: 'Ingeniero de Sistemas',
    headline: 'Construyo backends que aguantan tráfico y sistemas de IA que responden.',
    location: 'Ciudad Ejemplo, Colombia',
    bio: 'Ingeniero de Sistemas con enfoque en desarrollo backend (Python/Django, Java/Spring Boot) y experiencia construyendo sistemas con Inteligencia Artificial. En mi proyecto de grado lideré la arquitectura de un sistema conversacional: implementé una arquitectura RAG con búsqueda semántica, integré un modelo de lenguaje para la generación de respuestas y validé el prototipo con usuarios finales. También tengo experiencia en gestión y calidad de datos a escala. Actualmente curso una Maestría en Ingeniería de Software.',
    techStack: JSON.stringify(['Backend Developer', 'Python', 'Django', 'Java', 'Spring Boot', 'RAG', 'LLM']),
    email: 'alex.rivera@example.com',
    // Prefijo 00 y sufijo 0000000: no es asignable, así que el enlace de WhatsApp
    // ejercita la UI sin escribir por accidente a un número real.
    phone: '57-000-000-0000',
    whatsappMessage: 'Hola Alex, vi tu portafolio y me gustaría hablar sobre un proyecto.',
    linkedin: 'https://example.com/linkedin',
    github: 'https://example.com/github',
    // Vacío: la UI cae en un avatar genérico. Pon aquí la URL PÚBLICA de tu
    // imagen (bucket público de Supabase Storage u otro host https).
    // Nunca pegues una URL firmada: lleva un token de descarga dentro.
    profileImage: '',
    logoImage: '',
    // Vacío: sin CV no se pinta el botón "Descargar CV". Usa la URL PÚBLICA del
    // PDF, p. ej. https://<proyecto>.supabase.co/storage/v1/object/public/docs/cv.pdf
    cvUrl: '',
    availability: true,
  };

  const profile = await prisma.profile.upsert({
    where: { id: 'default' },
    update: profileData,
    create: { id: 'default', ...profileData },
  });
  console.log('✅ Profile created:', profile.firstName, profile.lastName);

  // ─────────────────────────────────────────────
  // Encabezados de sección
  // ─────────────────────────────────────────────
  const sectionHeadersData = [
    { key: 'sobre-mi', title: 'Sobre Mí', description: 'Quién soy, cómo trabajo y las tecnologías que domino.', order: 0 },
    { key: 'servicios', title: 'Mis Servicios', description: 'Soluciones completas de desarrollo de software adaptadas a tus necesidades', order: 1 },
    { key: 'experiencia', title: 'Experiencia Laboral', description: 'Mi trayectoria profesional combina desarrollo de software con IA y gestión de datos a escala.', order: 2 },
    { key: 'formacion', title: 'Formación Académica', description: 'Mi trayectoria educativa y formación continua', order: 3 },
    { key: 'portafolio', title: 'Mi Portafolio', description: 'Proyectos destacados que demuestran mi experiencia y habilidades', order: 4 },
    { key: 'tutoriales', title: 'Tutoriales', description: 'Próximamente compartiré tutoriales prácticos sobre desarrollo backend y sistemas con IA', order: 5 },
    { key: 'contacto', title: 'Contáctame', description: '¿Hablamos?\nEstoy disponible para oportunidades laborales y proyectos de desarrollo backend.', order: 6 },
  ];

  for (const headerData of sectionHeadersData) {
    const header = await prisma.sectionHeader.upsert({
      where: { key: headerData.key },
      update: headerData,
      create: headerData,
    });
    console.log('✅ Section header created:', header.key);
  }

  // ─────────────────────────────────────────────
  // Servicios
  // ─────────────────────────────────────────────
  const servicesData = [
    {
      title: 'Backend & APIs',
      description: 'Diseño y desarrollo de APIs REST robustas y escalables con Python/Django y Java/Spring Boot, incluyendo autenticación, validación y documentación.',
      icon: 'Server',
      features: ['REST APIs', 'GraphQL', 'Autenticación', 'Documentación'],
      order: 1,
    },
    {
      title: 'Bases de Datos',
      description: 'Diseño, implementación y optimización de bases de datos relacionales, con enfoque en integridad, rendimiento y escalabilidad.',
      icon: 'Database',
      features: ['PostgreSQL', 'Oracle', 'Modelado de datos', 'Optimización'],
      order: 2,
    },
    {
      title: 'Sistemas con Inteligencia Artificial',
      description: 'Integración de modelos de lenguaje (LLMs) y arquitecturas RAG para construir sistemas conversacionales inteligentes con accesibilidad.',
      icon: 'Brain',
      features: ['RAG', 'LangChain', 'GPT-4', 'Búsqueda semántica'],
      order: 3,
    },
    {
      title: 'Desarrollo Web',
      description: 'Desarrollo de interfaces web modernas como complemento al backend cuando el proyecto lo requiere.',
      icon: 'Layout',
      features: ['React/Next.js', 'Angular', 'TypeScript', 'Diseño responsivo'],
      order: 4,
    },
  ];

  for (const serviceData of servicesData) {
    const { features, ...rest } = serviceData;
    const featuresJson = JSON.stringify(features);
    const service = await prisma.service.upsert({
      where: { id: `service-${rest.order}` },
      update: { ...rest, features: featuresJson },
      create: {
        id: `service-${rest.order}`,
        ...rest,
        features: featuresJson,
      },
    });
    console.log('✅ Service created:', service.title);
  }

  // Eliminar servicios antiguos que ya no existen
  await prisma.service.deleteMany({
    where: {
      id: { in: ['service-5', 'service-6'] },
    },
  });
  console.log('🗑️ Old services removed (5, 6)');

  // ─────────────────────────────────────────────
  // Experiencia laboral
  // ─────────────────────────────────────────────
  const experiencesData = [
    {
      title: 'Analista de Datos',
      company: 'Acme Servicios S.A.S.',
      location: 'Ciudad Ejemplo',
      description: 'Apoyé la digitalización y la gestión de datos de un programa social. Diseñé una plantilla con macros para automatizar solicitudes recurrentes de los equipos de campo. Administré la calidad de datos de un registro de varios cientos de hogares, validando consistencia y corrigiendo errores de captura. Gestioné el repositorio documental en la nube con trazabilidad entre equipos.',
      startDate: 'Ene 2023',
      endDate: 'Dic 2023',
      isCurrent: false,
      order: 1,
    },
    {
      title: 'Operador de Captura de Datos',
      company: 'Datos y Cifras S.A.',
      location: 'Ciudad Ejemplo',
      description: 'Operé un sistema de captura de datos móvil para el registro y la georreferenciación de unidades de vivienda, sincronizando la información en tiempo real con un aplicativo web corporativo. Ejecuté controles de calidad mediante revisitas de verificación y validación en campo, gestionando copias de seguridad diarias y reportando inconsistencias cartográficas.',
      startDate: 'Feb 2022',
      endDate: 'Dic 2022',
      isCurrent: false,
      order: 2,
    },
    {
      title: 'Desarrollador de back-end e Investigador (Proyecto de Grado)',
      company: 'Universidad Ejemplo',
      location: 'Ciudad Ejemplo',
      description: 'Lideré el desarrollo del backend y la arquitectura de un sistema conversacional con IA para democratizar el acceso a la información institucional, implementando una arquitectura RAG con base vectorial para búsqueda semántica y un modelo de lenguaje para la generación de respuestas. Integré módulos de accesibilidad bidireccional (voz a texto y texto a voz) y pipelines de extracción de texto con OCR, validando el prototipo con usuarios finales mediante pruebas de rendimiento y usabilidad. Stack: Python, LangChain, base vectorial, Angular, Docker.',
      startDate: 'Ago 2021',
      endDate: 'Jul 2022',
      isCurrent: false,
      order: 3,
    },
  ];

  for (const experienceData of experiencesData) {
    const experience = await prisma.experience.upsert({
      where: { id: `experience-${experienceData.order}` },
      update: experienceData,
      create: {
        id: `experience-${experienceData.order}`,
        ...experienceData,
      },
    });
    console.log('✅ Experience created:', experience.title, 'at', experience.company);
  }

  // ─────────────────────────────────────────────
  // Formación académica
  // ─────────────────────────────────────────────
  const educationData = [
    {
      title: 'Ingeniería de Sistemas',
      institution: 'Universidad Ejemplo',
      type: 'Pregrado',
      location: 'Ciudad Ejemplo',
      description: 'Formación integral en ingeniería de sistemas, combinando ciencias básicas, fundamentos de ingeniería y componentes tecnológicos, investigativos y socio-humanistas, orientada al diseño y aplicación de soluciones computacionales con impacto en el entorno.',
      startDate: 'Ene 2018',
      endDate: 'Dic 2022',
      isCurrent: false,
      order: 1,
    },
    {
      title: 'Maestría en Ingeniería de Software',
      institution: 'Instituto Tecnológico de Ejemplo',
      type: 'Maestría',
      location: 'Ciudad Ejemplo',
      description: 'Formación orientada a liderar equipos y proyectos de ingeniería de software mediante inteligencia artificial, tecnologías emergentes y metodologías ágiles, con un enfoque práctico alineado a las necesidades actuales de la industria.',
      startDate: 'Ene 2024',
      endDate: 'Dic 2025',
      isCurrent: true,
      order: 2,
    },
  ];

  for (const eduData of educationData) {
    const education = await prisma.education.upsert({
      where: { id: `education-${eduData.order}` },
      update: eduData,
      create: {
        id: `education-${eduData.order}`,
        ...eduData,
      },
    });
    console.log('✅ Education created:', education.title);
  }

  // ─────────────────────────────────────────────
  // Proyectos (Portafolio)
  // ─────────────────────────────────────────────
  const projectsData = [
    {
      title: 'Portafolio Profesional',
      description: 'Plataforma web para presentar de forma profesional mi trayectoria, servicios y proyectos, con un canal de contacto directo y seguro para potenciales clientes o empleadores.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      githubUrl: 'https://example.com/portafolio',
      tags: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Resend'],
      order: 1,
    },
    {
      title: 'Chatbot RAG',
      description: 'Prototipo de chatbot asistido por tecnologías de inteligencia artificial para el acceso inclusivo a la información del reglamento estudiantil de una universidad.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      githubUrl: 'https://example.com/chatbot-rag',
      tags: ['Python', 'Angular', 'Milvus', 'Docker', 'GPT4', 'TTS', 'OCR', 'ASR'],
      order: 2,
    },
  ];

  // Eliminar proyectos ficticios antiguos
  await prisma.project.deleteMany({
    where: {
      id: { in: ['project-3', 'project-4', 'project-5', 'project-6'] },
    },
  });
  console.log('🗑️ Old placeholder projects removed');

  for (const projectData of projectsData) {
    const { tags, ...rest } = projectData;
    const tagsJson = JSON.stringify(tags);
    const project = await prisma.project.upsert({
      where: { id: `project-${rest.order}` },
      update: { ...rest, tags: tagsJson },
      create: {
        id: `project-${rest.order}`,
        ...rest,
        tags: tagsJson,
      },
    });
    console.log('✅ Project created:', project.title);
  }

  // ─────────────────────────────────────────────
  // Tutoriales (vacío por ahora)
  // ─────────────────────────────────────────────
  // Eliminar tutoriales placeholder antiguos
  await prisma.tutorial.deleteMany({
    where: {
      id: { in: ['tutorial-1', 'tutorial-2', 'tutorial-3', 'tutorial-4', 'tutorial-5', 'tutorial-6'] },
    },
  });
  console.log('🗑️ Old placeholder tutorials removed');

  // ─────────────────────────────────────────────
  // Categorías de habilidades y habilidades
  // ─────────────────────────────────────────────

  // Eliminar habilidades y categorías existentes para recrear limpias
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  console.log('🗑️ Old skills cleared');

  const skillsData = [
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      order: 1,
    },
    {
      category: 'Backend',
      items: ['Python', 'Django', 'Java', 'Spring Boot', 'REST APIs', 'Node.js', 'GraphQL', 'Express'],
      order: 2,
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'Oracle', 'SQLite', 'Prisma', 'Milvus'],
      order: 3,
    },
    {
      category: 'IA & Data',
      items: ['LangChain', 'GPT-4', 'RAG', 'OCR', 'ASR', 'TTS'],
      order: 4,
    },
    {
      category: 'DevOps & Tools',
      items: ['Git', 'Docker', 'CI/CD', 'Agile/Scrum', 'Jira', 'TDD', 'Gitflow'],
      order: 5,
    },
  ];

  for (const skillCategoryData of skillsData) {
    const category = await prisma.skillCategory.upsert({
      where: { name: skillCategoryData.category },
      update: { order: skillCategoryData.order },
      create: {
        name: skillCategoryData.category,
        order: skillCategoryData.order,
      },
    });
    console.log('✅ Skill category created:', category.name);

    for (let i = 0; i < skillCategoryData.items.length; i++) {
      const skillName = skillCategoryData.items[i];
      await prisma.skill.upsert({
        where: { id: `skill-${category.name}-${i}` },
        update: { name: skillName, order: i + 1 },
        create: {
          id: `skill-${category.name}-${i}`,
          name: skillName,
          categoryId: category.id,
          order: i + 1,
        },
      });
    }
    console.log(`   ✅ ${skillCategoryData.items.length} skills created for ${category.name}`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
      console.error('❌ Seed failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });