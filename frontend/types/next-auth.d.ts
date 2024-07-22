export type AuthUser = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string;
    updated_at: string;
    created_at: string;
    google_id: string | null;
    user_agent: null | string;
};

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        user: AuthUser;
        access_token: string;
    }

    interface Session {
        user: AuthUser;
        access_token: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user: AuthUser;
        access_token: string;
    }
}
