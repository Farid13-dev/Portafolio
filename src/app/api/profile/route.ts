import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const profile = await db.profile.findFirst();

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Parse techStack JSON
    const profileWithParsedStack = {
      ...profile,
      techStack: profile.techStack ? JSON.parse(profile.techStack) : []
    };

    return NextResponse.json(profileWithParsedStack);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
