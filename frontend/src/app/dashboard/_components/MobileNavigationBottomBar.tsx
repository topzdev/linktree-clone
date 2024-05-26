"use client"

import React from "react";
import pageRoutes from "@/configs/page-routes";
import MaterialSymbolsList from "@/components/icons/MaterialSymbolsList";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsDesignServicesOutline from "@/components/icons/MaterialSymbolsDesignServicesOutline";
import MaterialSymbolsSmartButtonSharp from "@/components/icons/MaterialSymbolsSmartButtonSharp";
import MaterialSymbolsFontDownloadOutline from "@/components/icons/MaterialSymbolsFontDownloadOutline";
import MaterialSymbolsAnalyticsOutline from "@/components/icons/MaterialSymbolsAnalyticsOutline";
import MaterialSymbolsSettingsOutline from "@/components/icons/MaterialSymbolsSettingsOutline";
import {cn} from "@/lib/utils";
import MobileNavigationBottomLink from "@/app/dashboard/_components/MobileNavigationBottomLink";
import useIsActivePage from "@/hooks/useIsActivePage";
import MaterialSymbolsMoreHoriz from "@/components/icons/MaterialSymbolsMoreHoriz";

export const mobileNavbarHeight = 83

type Props = {
    children?: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const links = [
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
]

const moreLinks = [
    {
        href: pageRoutes.dashboard.fonts.href,
        label: 'Fonts',
        icon: <MaterialSymbolsFontDownloadOutline/>
    },
    {
        href: pageRoutes.dashboard.analytics.href,
        label: 'Analytics',
        icon: <MaterialSymbolsAnalyticsOutline/>
    },
    {
        href: pageRoutes.dashboard.settings.href,
        label: 'Settings',
        icon: <MaterialSymbolsSettingsOutline/>
    },
]

const MobileNavigationBottomBar = ({className, ...props}: Props) => {

    return <div {...props}
                style={{
                    height: mobileNavbarHeight,
                    minHeight: mobileNavbarHeight
                }}
                className={cn('fixed bottom-0 left-0 w-screen bg-background border ', className)}>
        <ul className={'flex h-full w-full'}>
            {links.map(item => <li className={'w-full h-full'} key={item.label + 'MobileNav'}><MobileNavigationBottomLink className={'w-full h-full'} {...item}/></li>)}
            <li className="w-full h-full">
                <MobileNavigationBottomLink className={'w-full h-full'} icon={<MaterialSymbolsMoreHoriz/>} label={'More'} />
            </li>
        </ul>
    </div>
}

export default MobileNavigationBottomBar;