import React from "react";
import {usePathname} from "next/navigation";
import {LinkProps} from "next/link";

type Props = {
    children?: React.ReactNode,
    href: LinkProps.href,
    as?: LinkProps.as
}
const getPathname = (urlString: string) => {
    const url = new URL(urlString, 'http://example.com');
    return url.pathname;
}
const useIsActivePage = (props: Props) => {
    const pathname = usePathname();
    return pathname === getPathname(props.href) || pathname === getPathname(props.as);
}

export default useIsActivePage;