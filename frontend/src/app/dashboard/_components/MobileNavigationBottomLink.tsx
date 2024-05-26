import React from "react";
import {LinkProps} from "next/link";
import Typography from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import Link from "@/components/ui/link";
import useIsActivePage from "@/hooks/useIsActivePage";
import {variants} from "@/components/ui/button";
import {Slot} from "@radix-ui/react-slot";

type Props = {
    children?: React.ReactNode,
    href?: LinkProps['href'],
    label: string,
    icon: React.ReactNode,
    className?: string
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const MobileNavigationBottomLink = ({href, label, icon, className, ...props}: Props) => {
    const Comp = href ? Link : "button"
    const isActivePage = href ? useIsActivePage({href}) : false;

    // @ts-ignore
    return <Comp {...(href ?{href}:{})} className={cn('flex flex-col items-center gap-1 justify-center text-foreground-secondary', className, isActivePage ? variants.primary.tonal : '')} {...props}>
        <span className={'text-3xl'}>
        {icon}
        </span>
        <Typography variant={'small'}>{label}</Typography>
    </Comp>
}

export default MobileNavigationBottomLink;