import React from "react";
import {cn} from "@/lib/utils";
import AppLogoIcon from "@/components/common/AppLogoIcon";

type Props = {
    children?: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const MobileNavbar = ({className,...props}: Props) => {
    return <nav className={cn('fixed top-0 h-[70px] w-full flex bg-background border-b p-5', className)} {...props}>
        <AppLogoIcon className={'text-primary h-[30px] max-h-[30px] flex'} href={'/'}/>
    </nav>
}

export default MobileNavbar;