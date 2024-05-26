import React from "react";
import {Button} from "@/components/ui/button";
import useIsActivePage, {getHrefPathname} from "@/hooks/useIsActivePage";
import {LinkProps} from "next/link";
import Link from "@/components/ui/link";

type Props = {
    children?: React.ReactNode,
    href: LinkProps.href,
    label: string,
    icon: React.ReactNode
}

const NavigationLink = ({href, label, icon}: Props) => {
    const isActivePage = useIsActivePage({href});
    return <Link asChild href={href}>
        <Button rounded size={'xl'} className={'justify-start w-full'} color={isActivePage ? 'primary' : 'accent' } variant={'tonal'} iconLeft={icon}>
            {label}
        </Button>
    </Link>
}

export default NavigationLink;