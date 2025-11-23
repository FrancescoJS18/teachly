import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.redirect("/auth/login?error=google");
    }

    // Intercambiar el código por tokens Google
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.NEXT_PUBLIC_URL + "/api/auth/google/callback",
            grant_type: "authorization_code",
        }),
    });

    const tokens = await tokenRes.json();

    const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        }
    ).then((r) => r.json());

    await connectToDatabase();

    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
        user = await User.create({
            email: userInfo.email,
            password: "google_oauth",
        });
    }

    const jwtToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    return NextResponse.redirect(
        `/dashboard?token=${jwtToken}`
    );
}
