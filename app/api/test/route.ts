import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({ message: 'Conexión a MongoDB exitosa ✅' });
    } catch (err) {
        return NextResponse.json({ message: 'Error al conectar a MongoDB ❌', error: err }, { status: 500 });
    }
}
