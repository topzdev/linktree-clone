import React from "react";
import { usePathname } from "next/navigation";
import { LinkProps } from "next/link";

type Props = {
    children?: React.ReactNode;
    href: LinkProps["href"];
    as?: LinkProps["as"];
    exact?: boolean;
};

const getPathname = (urlString?: string) => {
    const url = new URL(urlString || "", "http://example.com");
    return url.pathname;
};

const useIsActivePage = ({ href, as, exact = true }: Props) => {
    const pathname = usePathname();
    return exact
        ? pathname === getPathname(href.toString()) ||
              pathname === getPathname(as?.toString())
        : pathname.includes(getPathname(href.toString()));
};

export default useIsActivePage;
