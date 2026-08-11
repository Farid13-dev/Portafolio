import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Crear perfil
  const profile = await prisma.profile.upsert({
    where: { id: 'default' },
    update: {
      firstName: 'Oliver Farid',
      lastName: 'Rodriguez Morales',
      title: 'Ingeniero de Sistemas | Backend Developer',
      email: 'oliver1006507@gmail.com',
      phone: '57-302-543-1466',
      linkedin: 'www.linkedin.com/in/oliver-farid-rodriguez-morales-a30629326',
      github: 'https://github.com/Farid13-dev',
      location: 'Florencia - Caquetá, Colombia',
      bio: 'Ingeniero de Sistemas especializado en el desarrollo de soluciones backend con Python (Django) y Java (Spring Boot). Me enfoco en la construcción de APIs REST robustas, la gestión eficiente de bases de datos relacionales y la integración de sistemas con Inteligencia Artificial.',
      techStack: JSON.stringify(['Python','Django', 'Java', 'Spring Boot', 'PostgreSQL', 'Oracle', 'APIs REST' , 'RAG', 'LLM']),
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face',
      logoImage: '/images/logo1.ico',
      availability: true
    },
    create: {
      id: 'default',
      firstName: 'Oliver Farid',
      lastName: 'Rodriguez Morales',
      title: 'Ingeniero de Sistemas | Backend Developer',
      email: 'oliver1006507@gmail.com',
      phone: '57-302-543-1466',
      linkedin: 'https://www.linkedin.com/in/oliver-rodriguez-a30629326',
      github: 'https://github.com/oliver-rodriguez',
      location: 'Florencia - Caquetá, Colombia',
      bio: 'Ingeniero de Sistemas especializado en el desarrollo de soluciones backend con Python (Django) y Java (Spring Boot). Me enfoco en la construcción de APIs REST robustas, la gestión eficiente de bases de datos relacionales y la integración de sistemas con Inteligencia Artificial.',
      techStack: JSON.stringify(['Python','Django', 'Java', 'Spring Boot', 'PostgreSQL', 'Oracle', 'APIs REST' , 'RAG', 'LLM']),
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face',
      logoImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      availability: true
    }
  });
  console.log('✅ Profile created:', profile.firstName, profile.lastName);

  // Crear servicios
  const servicesData = [
    {
      title: 'Desarrollo Web',
      description: 'Sitios web y aplicaciones web modernas, responsivas y optimizadas para SEO.',
      icon: 'Layout',
      features: ['React/Next.js', 'Diseño Responsivo', 'Optimización SEO', 'Web Apps'],
      order: 1
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Desarrollo de aplicaciones móviles multiplataforma con experiencia nativa.',
      icon: 'Smartphone',
      features: ['React Native', 'PWA', 'Apps Híbridas', 'UI/UX'],
      order: 2
    },
    {
      title: 'Backend & APIs',
      description: 'Arquitectura de backend robusta y APIs escalables para tus aplicaciones.',
      icon: 'Server',
      features: ['REST APIs', 'GraphQL', 'Microservicios', 'Autenticación'],
      order: 3
    },
    {
      title: 'Bases de Datos',
      description: 'Diseño e implementación de bases de datos optimizadas y escalables.',
      icon: 'Database',
      features: ['SQL', 'NoSQL', 'Optimización', 'Migración'],
      order: 4
    },
    {
      title: 'Cloud & DevOps',
      description: 'Implementación de soluciones en la nube y automatización de procesos.',
      icon: 'Cloud',
      features: ['AWS', 'Docker', 'CI/CD', 'Monitoreo'],
      order: 5
    },
    {
      title: 'Consultoría Técnica',
      description: 'Asesoramiento en arquitectura de software y mejores prácticas.',
      icon: 'Code',
      features: ['Code Review', 'Arquitectura', 'Mentoring', 'Auditoría'],
      order: 6
    }
  ];

  for (const serviceData of servicesData) {
    const service = await prisma.service.upsert({
      where: { id: `service-${serviceData.order}` },
      update: {},
      create: {
        id: `service-${serviceData.order}`,
        ...serviceData,
        features: JSON.stringify(serviceData.features)
      }
    });
    console.log('✅ Service created:', service.title);
  }

  // Crear proyectos
  const projectsData = [
    {
      title: 'Sistema de Gestión Empresarial',
      description: 'Plataforma completa para gestión de negocios con dashboard analítico y reportes en tiempo real.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/sistema-gestion-empresarial',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      order: 1
    },
    {
      title: 'E-commerce Moderno',
      description: 'Tienda en línea con pasarela de pagos, gestión de inventario y panel administrativo.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/ecommerce-moderno',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      order: 2
    },
    {
      title: 'App de Gestión de Tareas',
      description: 'Aplicación de productividad con sincronización en tiempo real y colaboración en equipo.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/gestor-tareas',
      tags: ['Next.js', 'WebSocket', 'SQLite', 'Tailwind'],
      order: 3
    },
    {
      title: 'Plataforma de Cursos Online',
      description: 'Sistema LMS completo con reproducción de video, quizzes y certificados.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/plataforma-cursos',
      tags: ['React', 'Node.js', 'AWS S3', 'PostgreSQL'],
      order: 4
    },
    {
      title: 'Dashboard Analítico',
      description: 'Panel de control con visualización de datos y reportes automatizados.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/dashboard-analitico',
      tags: ['Next.js', 'Chart.js', 'PostgreSQL', 'API REST'],
      order: 5
    },
    {
      title: 'Sistema de Reservas',
      description: 'Plataforma de reservas con calendario interactivo y gestión de disponibilidad.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/oliver-rodriguez/sistema-reservas',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      order: 6
    }
  ];

  for (const projectData of projectsData) {
    const project = await prisma.project.upsert({
      where: { id: `project-${projectData.order}` },
      update: {},
      create: {
        id: `project-${projectData.order}`,
        ...projectData,
        tags: JSON.stringify(projectData.tags)
      }
    });
    console.log('✅ Project created:', project.title);
  }

  // Crear tutoriales
  const tutorialsData = [
    {
      title: 'Introducción a Next.js 16',
      description: 'Aprende a crear aplicaciones web modernas con el último versión de Next.js.',
      level: 'Principiante',
      duration: '45 min',
      category: 'Frontend',
      youtubeUrl: 'https://youtube.com/watch?v=example-nextjs-16',
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop&q=80',
      order: 1
    },
    {
      title: 'TypeScript para Desarrolladores JavaScript',
      description: 'Guía completa para transicionar de JavaScript a TypeScript.',
      level: 'Intermedio',
      duration: '60 min',
      category: 'JavaScript',
      youtubeUrl: 'https://youtube.com/watch?v=example-typescript',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop&q=80',
      order: 2
    },
    {
      title: 'Diseño de APIs RESTful',
      description: 'Mejores prácticas para crear APIs escalables y mantenibles.',
      level: 'Intermedio',
      duration: '50 min',
      category: 'Backend',
      youtubeUrl: 'https://youtube.com/watch?v=example-rest-apis',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
      order: 3
    },
    {
      title: 'Tailwind CSS: Del Cero al Experto',
      description: 'Domina el framework de CSS utility-first más popular.',
      level: 'Principiante',
      duration: '90 min',
      category: 'CSS',
      youtubeUrl: 'https://youtube.com/watch?v=example-tailwind',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&q=80',
      order: 4
    },
    {
      title: 'PostgreSQL Avanzado',
      description: 'Técnicas avanzadas de optimización y diseño de bases de datos.',
      level: 'Avanzado',
      duration: '75 min',
      category: 'Database',
      youtubeUrl: 'https://youtube.com/watch?v=example-postgresql',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80',
      order: 5
    },
    {
      title: 'Deploy en AWS con Docker',
      description: 'Despliega tus aplicaciones en la nube utilizando contenedores.',
      level: 'Intermedio',
      duration: '55 min',
      category: 'DevOps',
      youtubeUrl: 'https://youtube.com/watch?v=example-aws-docker',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80',
      order: 6
    }
  ];

  for (const tutorialData of tutorialsData) {
    const tutorial = await prisma.tutorial.upsert({
      where: { id: `tutorial-${tutorialData.order}` },
      update: tutorialData,
      create: {
        id: `tutorial-${tutorialData.order}`,
        ...tutorialData
      }
    });
    console.log('✅ Tutorial created:', tutorial.title);
  }

  // Crear categorías de habilidades y habilidades
  const skillsData = [
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      order: 1
    },
    {
      category: 'Backend',
      items: ['Python' ,'Django', 'Java', 'Spring Boot', 'REST APIs', 'Node.js', 'GraphQL', 'Express'],
      order: 2
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'Oracle', 'MongoDB', 'Prisma', 'SQLite'],
      order: 3
    },
    {
      category: 'DevOps & Tools',
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Agile/Scrum'],
      order: 4
    }
  ];

  for (const skillCategoryData of skillsData) {
    const category = await prisma.skillCategory.upsert({
      where: { name: skillCategoryData.category },
      update: {},
      create: {
        name: skillCategoryData.category,
        order: skillCategoryData.order
      }
    });
    console.log('✅ Skill category created:', category.name);

    // Crear habilidades para esta categoría
    for (let i = 0; i < skillCategoryData.items.length; i++) {
      const skillName = skillCategoryData.items[i];
      await prisma.skill.upsert({
        where: { 
          id: `skill-${category.name}-${i}` 
        },
        update: {},
        create: {
          id: `skill-${category.name}-${i}`,
          name: skillName,
          categoryId: category.id,
          order: i + 1
        }
      });
    }
    console.log(`   ✅ ${skillCategoryData.items.length} skills created for ${category.name}`);
  }

  // Crear experiencias
  const experiencesData = [
    {
      title: 'Programador Web Full Stack',
      company: 'Secretaria de Desarrollo Agroalimentario y Rural (SDAyR)',
      location: 'Florencia - Caquetá',
      description: 'Desde Mayo del 2014 he desarrollado y dado mantenimiento a un total de 13 proyectos en esta dependencia, por mencionar los más importantes se encuentran MATRi y RiegoTec.',
      startDate: 'May 14',
      endDate: null,
      isCurrent: true,
      order: 1
    },
    {
      title: 'Programador Senior',
      company: 'Ant Factory Systems',
      location: 'Puebla, Pue.',
      description: 'Se desarrolló e implementó el sistema SILOS y se creó la página principal de la Feria del Préstamo.',
      startDate: 'Oct 13',
      endDate: 'May 14',
      isCurrent: false,
      order: 2
    }
  ];

  for (const experienceData of experiencesData) {
    const experience = await prisma.experience.upsert({
      where: { id: `experience-${experienceData.order}` },
      update: {},
      create: {
        id: `experience-${experienceData.order}`,
        ...experienceData
      }
    });
    console.log('✅ Experience created:', experience.title, 'at', experience.company);
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
