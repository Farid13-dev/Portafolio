import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const headers = await db.sectionHeader.findMany({
            orderBy: { order: 'asc' }
        });
        // Convertir a objeto { key: { title, description } } para acceso directo
        const headersMap = headers.reduce((acc, h) => {
            acc[h.key] = { title: h.title, description: h.description };
            return acc;
        }, {} as Record<string, { title: string; description: string }>);

        return NextResponse.json(headersMap);
    } catch (error) {
        console.error('Error fetching section headers:', error);
        return NextResponse.json({ error: 'Failed to fetch section headers' }, { status: 500 });
    }
}