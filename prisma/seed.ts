import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ─────────────────────────────────────────────
  // Perfil
  // ─────────────────────────────────────────────
  const profileData = {
    firstName: 'Oliver',
    lastName: 'Rodriguez',
    title: 'Ingeniero de Sistemas | Backend Developer',
    titleProfile: 'Ingeniero de Sistemas',
    location: 'Florencia - Caquetá, Colombia',
    bio: 'Ingeniero de Sistemas con enfoque en desarrollo backend (Python/Django, Java/Spring Boot) y experiencia construyendo sistemas con Inteligencia Artificial. En mi proyecto de grado lideré la arquitectura de un sistema conversacional con IA: implementé una arquitectura RAG con Milvus para búsqueda semántica, integré GPT-4 para generación de respuestas, y validé el prototipo con 30 usuarios reales. También tengo experiencia en gestión y calidad de datos a escala, cubriendo el registro de 650+ familias en ICBF y georreferenciación en DANE. Actualmente curso la Maestría en Ingeniería de Software en la Universidad de los Andes.',
    techStack: JSON.stringify(['Backend Developer', 'Python', 'Django', 'Java', 'Spring Boot', 'RAG', 'LLM']),
    email: 'oliver1006507@gmail.com',
    phone: '57-302-543-1466',
    whatsappMessage: 'Hola Oliver, vi tu portafolio y me gustaría hablar sobre un proyecto.',
    linkedin: 'https://www.linkedin.com/in/oliver-farid-rodriguez-morales-a30629326/',
    github: 'https://github.com/Farid13-dev',
    profileImage: 'https://mdlaipedphhhgsazcqlq.supabase.co/storage/v1/object/sign/img/FotoPefil.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83ZDc0YmJlNC04ZTljLTRiOWQtOTEzNi05YTc0NDIwYWU1ZTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvRm90b1BlZmlsLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg2NDg4Mjc1LCJleHAiOjE4MTgwMjQyNzV9.26cXVvByFJPySnTBJGf6KT2LNarR2X_p5pMdow7Gjms',
    logoImage: '',
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
    { key: 'sobre-mi', title: 'Sobre Mí', description: '', order: 0 },
    { key: 'servicios', title: 'Mis Servicios', description: 'Soluciones completas de desarrollo de software adaptadas a tus necesidades', order: 1 },
    { key: 'experiencia', title: 'Experiencia Laboral', description: 'Mi trayectoria profesional combina desarrollo de software con IA y gestión de datos a escala en entidades nacionales.', order: 2 },
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
      title: 'Auxiliar Administrativo',
      company: 'Instituto Colombiano de Bienestar Familiar (ICBF)',
      location: 'Florencia - Caquetá',
      description: 'Apoyé la digitalización y gestión de datos del servicio "Somos Familia, Somos Comunidad". Diseñé una plantilla en Excel con macros (VBA) para automatizar solicitudes de refrigerios en 6 equipos de campo. Administré la calidad de datos del registro de 650 familias (~1.950 integrantes), validando consistencia y corrigiendo errores de captura. Gestioné el repositorio documental en la nube (OneDrive) con trazabilidad entre equipos.',
      startDate: '09 May 2025',
      endDate: '06 Dec 2025',
      isCurrent: false,
      order: 1,
    },
    {
      title: 'Recuentista',
      company: 'Departamento Administrativo Nacional de Estadística (DANE)',
      location: 'Florencia - Caquetá',
      description: 'Operé un sistema de captura de datos móvil (DMC) para el registro y georreferenciación de unidades de vivienda, sincronizando información en tiempo real con un aplicativo web corporativo. Ejecuté controles de calidad de datos mediante revisitas de verificación y validación en campo, gestionando copias de seguridad diarias y reportando inconsistencias cartográficas para garantizar la integridad del marco geoestadístico nacional.',
      startDate: '16 Feb 2024',
      endDate: '31 Dec 2025',
      isCurrent: false,
      order: 2,
    },
    {
      title: 'Desarrollador de back-end e Investigador (Proyecto de Grado)',
      company: 'Universidad de la Amazonia',
      location: 'Florencia - Caquetá',
      description: 'Lideré el desarrollo del backend y la arquitectura de un sistema conversacional con IA para democratizar el acceso a información institucional, implementando una arquitectura RAG con Milvus para búsqueda semántica y GPT-4 para generación de respuestas. Integré módulos de accesibilidad bidireccional (Whisper y PiperTTS) y pipelines de extracción de texto con EasyOCR, validando el prototipo con 30 usuarios finales mediante pruebas de rendimiento y usabilidad. Stack: Python, LangChain, GPT-4, Milvus, Angular, Docker.',
      startDate: '01 Ago 2024',
      endDate: '24 Jul 2025',
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
      institution: 'Universidad de la Amazonia',
      type: 'Pregrado',
      location: 'Florencia - Caquetá',
      description: 'Formación integral en ingeniería de sistemas, combinando ciencias básicas, fundamentos de ingeniería y componentes tecnológicos, investigativos y socio-humanistas, orientada al diseño y aplicación de soluciones computacionales con impacto en el entorno.',
      startDate: 'Ago 2019',
      endDate: 'Ago 2025',
      isCurrent: false,
      order: 1,
    },
    {
      title: 'Maestría en Ingeniería de Software',
      institution: 'Universidad de los Andes',
      type: 'Maestría',
      location: 'Bogotá (D.C)',
      description: 'Formación orientada a liderar equipos y proyectos de ingeniería de software mediante inteligencia artificial, tecnologías emergentes y metodologías ágiles, con un enfoque práctico alineado a las necesidades actuales de la industria.',
      startDate: 'Feb 2026',
      endDate: 'Dec 2027',
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
      githubUrl: 'https://github.com/Farid13-dev/Portafolio',
      tags: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Resend'],
      order: 1,
    },
    {
      title: 'Chatbot RAG',
      description: 'Prototipo de Chatbot asistido por tecnologías de inteligencia artificial para el acceso inclusivo a la información del estatuto estudiantil en la UDLA.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/Farid13-dev/Chatbot-RAG',
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