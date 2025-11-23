import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    pages: {
        signIn: "/auth/login", // Página de login
    },

    callbacks: {
        async signIn({ user, account }) {
            // Si quieres bloquear correos, aquí lo haces
            return true;
        },

        async redirect({ url, baseUrl }) {
            // Después de iniciar sesión, enviarlo al dashboard
            return "/dashboard";
        },
    },
});

export { handler as GET, handler as POST };

