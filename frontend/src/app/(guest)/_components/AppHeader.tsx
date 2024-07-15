import React from "react";
import AppLogo from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pageRoutes from "@/configs/page-routes";

type Props = {
    children?: React.ReactNode;
};

const AppHeader = (props: Props) => {
    return (
        <div className={"fixed left-0 top-0 flex w-full justify-center py-10"}>
            <AppLogo />

            <div className={"absolute right-10 top-1/2 -translate-y-1/2"}>
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
