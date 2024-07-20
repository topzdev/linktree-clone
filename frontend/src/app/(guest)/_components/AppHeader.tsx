import React from "react";
import AppLogo from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pageRoutes from "@/configs/page-routes";
import AppLogoIcon from "@/components/common/AppLogoIcon";

type Props = {
    children?: React.ReactNode;
};

const AppHeader = (props: Props) => {
    return (
        <div
            className={
                "min-lg:py-10 fixed left-0 top-0 flex w-full items-center bg-background bg-opacity-50 px-5 py-5 backdrop-blur-md lg:justify-center lg:py-10"
            }
        >
            <AppLogoIcon
                className={"hidden h-8 text-primary max-lg:block"}
                href={"/"}
            />

            <AppLogo className={"block max-lg:hidden"} />

            <div
                className={
                    "absolute right-5 top-1/2 -translate-y-1/2 lg:right-10"
                }
            >
                <Button asChild color={"accent"} variant={"text"}>
                    <Link href={pageRoutes.login.href}>Login</Link>
                </Button>
                <Button asChild color={"primary"}>
                    <Link href={pageRoutes.register.href}>Sign Up</Link>
                </Button>
            </div>
        </div>
    );
};

export default AppHeader;