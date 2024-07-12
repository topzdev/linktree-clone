"use client";

import React from "react";
import { cn } from "@/lib/utils";
import pageRoutes from "@/configs/page-routes";
import MaterialSymbolsList from "@/components/icons/MaterialSymbolsList";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsDesignServicesOutline from "@/components/icons/MaterialSymbolsDesignServicesOutline";
import MaterialSymbolsSettingsOutline from "@/components/icons/MaterialSymbolsSettingsOutline";
import AppLogoIcon from "@/components/common/AppLogoIcon";
import NavigationLink from "./NavigationLink";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

export const links = [
    {
        href: pageRoutes.dashboard.links.href,
        label: "Links",
        icon: <MaterialSymbolsList />,
        exact: true,
    },
    {
        href: pageRoutes.dashboard.profile.href,
        label: "Profile",
        icon: <MaterialSymbolsAccountCircleOutline />,
        exact: false,
    },
    {
        href: pageRoutes.dashboard.appearance.href,
        label: "Appearance",
        icon: <MaterialSymbolsDesignServicesOutline />,
        exact: false,
    },
    {
        href: pageRoutes.dashboard.settings.href,
        label: "Settings",
        icon: <MaterialSymbolsSettingsOutline />,
        exact: false,
    },
];

const NavigationSidebar = ({ className }: Props) => {
    const { data: session } = useSession();
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <aside
            className={cn(
                "flex flex-col items-start gap-y-8 bg-background px-4 py-8 lg:gap-y-12 lg:px-5 lg:py-12",
                className,
            )}
        >
            <AppLogoIcon
                className={"flex h-[30px] max-h-[30px] text-primary"}
                href={"/"}
            />
            <ul className={"flex w-full flex-col gap-y-2 lg:gap-y-4"}>
                {links.map((item) => (
                    <li key={item.label}>
                        <NavigationLink {...item} />
                    </li>
                ))}
            </ul>

            {session && (
                <Button
                    onClick={handleLogout}
                    className={"mt-auto"}
                    variant={"text"}
                    color={"accent"}
                >
                    Logout
                </Button>
            )}
        </aside>
    );
};

export default NavigationSidebar;
