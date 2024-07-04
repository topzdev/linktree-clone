"use client";

import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pageRoutes from "@/configs/page-routes";
import React from "react";
import useIsActivePage from "@/hooks/useIsActivePage";

type Props = {};

const AppearanceLink = ({ label, href }: { label: string; href: string }) => {
    const isActivePage = useIsActivePage({ href });

    return (
        <Button
            asChild
            className={"w-full"}
            size={"lg"}
            variant={isActivePage ? "filled" : "text"}
            color={isActivePage ? "primary" : "accent"}
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
};
const AppearancePageToggler = (props: Props) => {
    return (
        <DashboardContainer className={"justify-start"}>
            <div
                className={
                    "mb-10 flex w-auto items-center rounded-full bg-slate-200"
                }
            >
                <AppearanceLink
                    label={"Customized"}
                    href={pageRoutes.dashboard.appearance.href}
                />
                <AppearanceLink
                    label={"Themes"}
                    href={pageRoutes.dashboard.appearance.themes.href}
                />
            </div>
        </DashboardContainer>
    );
};

export default AppearancePageToggler;
