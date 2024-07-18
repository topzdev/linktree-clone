import { useMemo } from "react";
import {
    signIn,
    signOut,
    useSession,
    UseSessionOptions,
} from "next-auth/react";
import { Credentials, RegisterInfo } from "@/app/api/auth/[...nextauth]/route";
import { homeRoute, loginRoute } from "@/middleware";

const useAppAuth = (options?: UseSessionOptions<any>) => {
    const { data: session, update, status } = useSession(options);

    const authState = useMemo(() => {
        return {
            isLoggedIn: !!session,
            user: session?.user,
            access_token: session?.access_token,
        };
    }, [session]);

    const register = async (info: RegisterInfo) => {
        await signIn("register", {
            ...info,
            redirect: false,
        }).then((data) => {
            if (data?.error) {
                throw JSON.parse(data.error);
            }
            // window.location.href = data?.url || homeRoute
            window.location.href = homeRoute;
        });
    };

    const login = async (credentials: Credentials) => {
        await signIn("login", { ...credentials, redirect: false }).then(
            (data) => {
                if (data?.error) {
                    throw JSON.parse(data.error);
                }
                window.location.href = homeRoute;
            },
        );
    };

    const logout = async () => {
        await signOut().then((data) => {
            console.log(data);
            window.location.href = loginRoute;
        });
    };

    const oauthLogin = async (provider: "google" | "facebook") => {
        await signIn(provider, { ...{ provider }, redirect: false }).then(
            (data) => {
                console.log(data);
                if (data?.error) {
                    throw JSON.parse(data.error);
                }
                window.location.href = loginRoute;
            },
        );
    };

    return {
        ...authState,
        session,
        update,
        status,
        register,
        oauthLogin,
        login,
        logout,
    };
};

export default useAppAuth;
