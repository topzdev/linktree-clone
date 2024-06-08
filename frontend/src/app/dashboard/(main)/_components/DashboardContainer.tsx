import React from "react";

type Props = {
    children?: React.ReactNode
}

const DashboardContainer = ({children}: Props) => {
    return <div className={'relative max-lg px-4 max-w-[600px] mx-auto'}>
        {children}
    </div>
}

export default DashboardContainer;