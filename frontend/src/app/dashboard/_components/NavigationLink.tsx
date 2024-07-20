import React from "react";
import { Button } from "@/components/ui/button";
import useIsActivePage from "@/hooks/useIsActivePage";
import { LinkProps } from "next/link";
import Link from "@/components/ui/link";

type Props = {
    children?: React.ReactNode;
    href: LinkProps["href"];
    label: string;
    icon: React.ReactNode;
    exact: boolean;
};

const NavigationLink = ({ href, label, icon, exact }: Props) => {
    const isActivePage = useIsActivePage({ href, exact });
    return (
        <Link href={href}>
            <Button
                rounded
                size={"xl"}
                className={"w-full justify-start"}
                color={isActivePage ? "primary" : "accent"}
                variant={isActivePage ? "tonal" : "text"}
                iconLeft={icon}
            >
                {label}
            </Button>
        </Link>
    );
};

export default NavigationLink;
