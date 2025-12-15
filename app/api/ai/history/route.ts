import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AiHistory from "@/models/AiHistory";

export async function POST(req: Request) {
    const { userId } = await req.json();

    await connectToDatabase();

    const history = await AiHistory.find({ userId })
        .sort({ createdAt: 1 });

    return NextResponse.json(history);
}
