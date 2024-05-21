"use client"
import React, {cloneElement, ReactElement} from "react";
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import Link, {LinkProps} from "next/link";

type ActiveLinkProps = {
    children?: React.ReactNode;
    activeClassName?: string;
    className?: string;
} & LinkProps

export const AppActiveLink = ({ children, activeClassName, className, ...props }: ActiveLinkProps) => {
    const pathname  = usePathname();

    if (pathname === props.href || pathname === props.as) {
        className = `${className} ${activeClassName}`.trim();
    }
    return <Link className={className} {...props}>
        {children}
    </Link>;
};

const AppLink = Link;


export default  AppLink;