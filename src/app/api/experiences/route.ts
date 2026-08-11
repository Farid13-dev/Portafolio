import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Check if experience model exists
    if (!db.experience) {
      console.log('Experience model not found in Prisma Client, returning empty array');
      return NextResponse.json([]);
    }

    const experiences = await db.experience.findMany({
      where: {
        published: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
