import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { JWT } from "next-auth/jwt";

/*Next Auth Guide
 * https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
 *
 * */

export type Credentials = {
    email: string;
    password: string;
};

export type RegisterInfo = {
    username: string;
    email: string;
    password: string;
};

export type UpdateUser = Pick<User, "email" | "firstname" | "lastname">;

export type User = {
    id: number;
    provider: string | null;
    provider_id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string;
    updated_at: string;
    created_at: string;
    is_facebook_registered?: boolean;
};

type LoginResponse = {
    access_token: string;
};

type AccessTokenAuth = {
    access_token: string;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
            async profile(profile) {
                try {
                    const response = await fetch(`${API_URL}/oauth`, {
                        method: "POST",
                        body: JSON.stringify({
                            access_token: profile.access_token,
                            provider: "facebook",
                        }),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(
                            error.message || "Facebook authentication failed",
                        );
                    }

                    const data = await response.json();

                    return {
                        id: profile.id,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture?.data?.url,
                        access_token: data.access_token,
                    } as any;
                } catch (error) {
                    console.error("Facebook auth error:", error);
                    throw error;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            async profile(profile) {
                try {
                    const response = await fetch(`${API_URL}/oauth`, {
                        method: "POST",
                        body: JSON.stringify({
                            access_token: profile.access_token,
                            provider: "google",
                        }),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(
                            error.message || "Google authentication failed",
                        );
                    }

                    const data = await response.json();

                    return {
                        id: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        access_token: data.access_token,
                    } as any;
                } catch (error) {
                    console.error("Google auth error:", error);
                    throw error;
                }
            },
        }),
        CredentialsProvider({
            id: "access_token",
            name: "Access Token",
            credentials: {
                access_token: { label: "Access Token", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.access_token) return null;
                return { access_token: credentials.access_token } as any;
            },
        }),
        CredentialsProvider({
            id: "register",
            name: "Register",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const response = await fetch(`${API_URL}/register`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message || "Registration failed");
                    }

                    const data = await response.json();
                    return { access_token: data.access_token } as any;
                } catch (error) {
                    console.error("Registration error:", error);
                    throw error;
                }
            },
        }),
        CredentialsProvider({
            name: "Login",
            id: "login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const response = await fetch(`${API_URL}/login`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message || "Login failed");
                    }

                    const data = await response.json();
                    return { access_token: data.access_token } as any;
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error(error || "Login failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.access_token = user.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            try {
                const response = await fetch(`${API_URL}/api/user`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: token.access_token
                            ? `Bearer ${token.access_token}`
                            : "",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const user = await response.json();
                return {
                    ...session,
                    user: user,
                    access_token: token.access_token,
                };
            } catch (error) {
                console.error("Session error:", error);
                throw error;
            }
        },
    },
    events: {
        async signOut({ token }) {
            try {
                const response = await fetch(`${API_URL}/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Logout failed");
                }
            } catch (error) {
                console.error("Logout error:", error);
                throw error;
            }
        },
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
