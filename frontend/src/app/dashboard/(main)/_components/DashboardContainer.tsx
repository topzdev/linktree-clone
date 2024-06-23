import React from "react";
import {cn} from "@/lib/utils";

type Props = {
    children?: React.ReactNode
} &  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const DashboardContainer = ({children, className, ...props}: Props) => {
    return <div className={cn('relative max-lg px-4 max-w-[600px] mx-auto',className)} {...props}>
        {children}
    </div>
}

export default DashboardContainer;