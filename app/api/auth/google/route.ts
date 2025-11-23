import { NextResponse } from "next/server";

export async function GET() {
    const redirectUri = encodeURIComponent(
        process.env.NEXT_PUBLIC_URL + "/api/auth/google/callback"
    );

    const clientId = process.env.GOOGLE_CLIENT_ID;

    const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` +
        `&scope=openid email profile`;

    return NextResponse.redirect(googleAuthUrl);
}
