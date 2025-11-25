import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

// GET /api/courses
export async function GET() {
    await connectToDatabase();
    const courses = await Course.find();
    return NextResponse.json(courses);
}

// POST /api/courses
export async function POST(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
}



