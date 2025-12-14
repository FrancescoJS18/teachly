import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Progress from "@/models/Progress";

export async function POST(req: Request) {
    try {
        const { userId, courseId } = await req.json();

        await connectToDatabase();

        const progress = await Progress.find({
            userId,
            courseId,
            completed: true,
            lessonId: { $in: ["1", "2", "3", 1, 2, 3] } // 🔥 CLAVE
        });

        return NextResponse.json({
            hasAccess: progress.length >= 3 // 🔥 más robusto
        });

    } catch (error) {
        console.error("ERROR CHECK EXAM ACCESS:", error);
        return NextResponse.json(
            { hasAccess: false },
            { status: 500 }
        );
    }
}




