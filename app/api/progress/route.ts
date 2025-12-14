import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Progress from "@/models/Progress";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();

    const progress = await Progress.create(body);

    return NextResponse.json(progress);
}
