"use client";

import React from "react";
import pageRoutes from "@/configs/page-routes";
import MaterialSymbolsList from "@/components/icons/MaterialSymbolsList";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsDesignServicesOutline from "@/components/icons/MaterialSymbolsDesignServicesOutline";
import MaterialSymbolsFontDownloadOutline from "@/components/icons/MaterialSymbolsFontDownloadOutline";
import MaterialSymbolsSettingsOutline from "@/components/icons/MaterialSymbolsSettingsOutline";
import { cn } from "@/lib/utils";
import MobileNavigationBottomLink from "@/app/dashboard/_components/MobileNavigationBottomLink";
import Image from "next/image";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import { mobileNavbarHeight } from "@/configs/layout-config";
import AccountAvatar from "@/app/dashboard/_components/AccountAvatar";

type Props = {
    children?: React.ReactNode;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

const links = [
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

const moreLinks = [
    {
        href: pageRoutes.dashboard.settings.href,
        label: "Fonts",
        icon: <MaterialSymbolsFontDownloadOutline />,
    },
    {
        href: pageRoutes.dashboard.settings.href,
        label: "Settings",
        icon: <MaterialSymbolsSettingsOutline />,
    },
];

const MobileNavigationBottomBar = ({ className, ...props }: Props) => {
    return (
        <div
            {...props}
            style={{
                height: mobileNavbarHeight,
                minHeight: mobileNavbarHeight,
            }}
            className={cn(
                "fixed bottom-0 left-0 w-screen border bg-background",
                className,
            )}
        >
            <ul className={"flex h-full w-full"}>
                {links.map((item) => (
                    <li
                        className={"h-full w-full"}
                        key={item.label + "MobileNav"}
                    >
                        <MobileNavigationBottomLink
                            className={"h-full w-full"}
                            {...item}
                        />
                    </li>
                ))}
                <MobileNavigationBottomLink
                    href={pageRoutes.dashboard.more.href}
                    className={"h-full w-full"}
                >
                    <AccountAvatar className="h-10 w-10" />
                </MobileNavigationBottomLink>
            </ul>
        </div>
    );
};

export default MobileNavigationBottomBar;
