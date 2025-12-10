import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Course";

// GET /api/courses
export async function GET() {
    try {
        await connectToDatabase();
        const courses = await Course.find();
        return NextResponse.json(courses);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

// POST /api/courses
export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const course = await Course.create(body);
        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Error al crear curso:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
