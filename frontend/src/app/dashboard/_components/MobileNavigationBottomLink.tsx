import React from "react";
import {LinkProps} from "next/link";
import Typography from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import Link from "@/components/ui/link";
import useIsActivePage from "@/hooks/useIsActivePage";
import {variants} from "@/components/ui/button";

type Props = {
    children?: React.ReactNode,
    href: LinkProps['href'],
    label: string,
    icon: React.ReactNode,
    className?: string
}

const MobileNavigationBottomLink = ({href, label, icon, className}: Props) => {
    const isActivePage = useIsActivePage({href});

    return <Link href={href} className={cn('flex flex-col items-center gap-1 justify-center text-foreground-secondary', className, isActivePage ? variants.primary.tonal : '')}>
        <span className={'text-3xl'}>
        {icon}
        </span>
        <Typography variant={'small'}>{label}</Typography>
    </Link>
}

export default MobileNavigationBottomLink;