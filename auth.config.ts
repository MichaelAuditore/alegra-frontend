import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser {
    id: string;
    name: string;
    email: string;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<ExtendedUser | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                // Simulated user (Replace with real DB logic)
                const user: ExtendedUser & { password: string } = {
                    id: "1",
                    name: "Miguel",
                    email: "miguel@example.com",
                    password: "F1rst_L0g1n*",
                };

                const alegraUser: ExtendedUser & { password: string } = {
                    id: "2",
                    name: "Scouting",
                    email: "scouting@alegra.com",
                    password: "t3stMv_4pp*",
                };

                const allowedUsers = [user, alegraUser];

                const isValidUser = allowedUsers.some((allowedUser) =>
                    allowedUser.email === credentials.email && allowedUser.password === credentials.password
                );

                if (isValidUser) {
                    const userWithoutPassword = allowedUsers.find((allowedUser) =>
                        allowedUser.email === credentials.email && allowedUser.password === credentials.password
                    );

                    const { password, ...userData } = userWithoutPassword!;
                    return userData;
                }

                throw new Error("Invalid email or password");
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        maxAge: 30 * 60,
        updateAge: 60 * 60
    },
};
