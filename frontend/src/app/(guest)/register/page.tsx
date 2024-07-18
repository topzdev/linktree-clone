import React from "react";
import Typography from "@/components/ui/typography";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import Link from "@/components/ui/link";
import RegisterForm from "@/app/(guest)/register/_components/RegisterForm";

type Props = {
    children?: React.ReactNode;
};

const Page = (props: Props) => {
    return (
        <div className="container flex items-center justify-center pb-10 pt-[150px]">
            <div className="mx-auto grid w-full max-w-sm items-center gap-6">
                <div className={"flex flex-col gap-y-1"}>
                    <Typography className={"text-center"} variant="h2" as="h2">
                        Welcome!
                    </Typography>
                    <Typography
                        foreground="secondary"
                        className={"text-center"}
                        variant="p"
                        as="p"
                    >
                        Sign up for Linktree Account
                    </Typography>
                </div>

                <RegisterForm />

                <Typography
                    className={"text-center uppercase"}
                    foreground="secondary"
                    variant="p"
                    as="p"
                >
                    or
                </Typography>

                <div className={"flex flex-col gap-y-2"}>
                    <GoogleLoginButton />
                </div>

                <Typography
                    className={"my-4 text-center"}
                    foreground="secondary"
                    variant="p"
                    as="p"
                >
                    Already have an account?{" "}
                    <Link className="text-blue-500 underline" href={"/login"}>
                        Sign In
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Page;
