import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: {
        published: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    // Parse features JSON
    const servicesWithParsedFeatures = services.map(service => ({
      ...service,
      features: JSON.parse(service.features)
    }));

    return NextResponse.json(servicesWithParsedFeatures);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
