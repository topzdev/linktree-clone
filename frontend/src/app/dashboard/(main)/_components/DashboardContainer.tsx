import React from "react";

type Props = {
    children?: React.ReactNode
} &  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const DashboardContainer = ({children, ...props}: Props) => {
    return <div className={'relative max-lg px-4 max-w-[600px] mx-auto'} {...props}>
        {children}
    </div>
}

export default DashboardContainer;