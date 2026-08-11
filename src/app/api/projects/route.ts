import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: {
        published: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    // Parse tags JSON
    const projectsWithParsedTags = projects.map(project => ({
      ...project,
      tags: JSON.parse(project.tags)
    }));

    return NextResponse.json(projectsWithParsedTags);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
