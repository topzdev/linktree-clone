"use client";

import React from "react";
import {cn} from "@/lib/utils";
import pageRoutes from "@/configs/page-routes";
import MaterialSymbolsList from "@/components/icons/MaterialSymbolsList";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsDesignServicesOutline from "@/components/icons/MaterialSymbolsDesignServicesOutline";
import MaterialSymbolsSmartButtonSharp from "@/components/icons/MaterialSymbolsSmartButtonSharp";
import MaterialSymbolsFontDownloadOutline from "@/components/icons/MaterialSymbolsFontDownloadOutline";
import MaterialSymbolsAnalyticsOutline from "@/components/icons/MaterialSymbolsAnalyticsOutline";
import MaterialSymbolsSettingsOutline from "@/components/icons/MaterialSymbolsSettingsOutline";
import AppLogoIcon from "@/components/common/AppLogoIcon";
import NavigationLink from "./NavigationLink";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";

type Props = {
    children?: React.ReactNode,
    className?: string,
}


export const links = [
    {
        href: pageRoutes.dashboard.links.href,
        label: 'Links',
        icon: <MaterialSymbolsList/>
    },
    {
        href: pageRoutes.dashboard.profile.href,
        label: 'Profile',
        icon: <MaterialSymbolsAccountCircleOutline/>
    },
    {
        href: pageRoutes.dashboard.theme.href,
        label: 'Theme',
        icon: <MaterialSymbolsDesignServicesOutline/>
    },
    {
        href: pageRoutes.dashboard.buttons.href,
        label: 'Buttons',
        icon: <MaterialSymbolsSmartButtonSharp/>
    },
    {
        href: pageRoutes.dashboard.fonts.href,
        label: 'Fonts',
        icon: <MaterialSymbolsFontDownloadOutline/>
    },
    {
        href: pageRoutes.dashboard.socials.href,
        label: 'Settings',
        icon: <MaterialSymbolsSettingsOutline/>
    },
]

const NavigationSidebar = ({className}: Props) => {
    const {data: session} = useSession();
    const handleLogout = async () => {
        await signOut();
    }

    return <aside
        className={cn("flex flex-col items-start bg-background px-4 lg:px-5 py-8 lg:py-12 gap-y-8 lg:gap-y-12 ", className)}>
        <AppLogoIcon className={'text-primary h-[30px] max-h-[30px] flex'} href={'/'}/>
        <ul className={'flex flex-col gap-y-2 lg:gap-y-4 w-full'}>
            {links.map(item => <li key={item.label}><NavigationLink  {...item}/></li>)}
        </ul>

        {session && <Button onClick={handleLogout} className={'mt-auto'} variant={'text'} color={'accent'}>Logout</Button>}
    </aside>
}

export default NavigationSidebar;