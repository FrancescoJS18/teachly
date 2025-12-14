import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        await connectToDatabase();

        const user = await User.findOne({ userId });

        return NextResponse.json({
            name: user?.name || "Alumno"
        });
    } catch (error) {
        console.error("ERROR USER GET:", error);
        return NextResponse.json({ name: "Alumno" }, { status: 500 });
    }
}
