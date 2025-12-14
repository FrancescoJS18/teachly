import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function POST(req: Request) {
    const { userId, courseId, score } = await req.json();

    await connectToDatabase();

    const passed = score >= 4;

    await Exam.create({
        userId,
        courseId,
        score,
        passed,
    });

    return NextResponse.json({ passed });
}
