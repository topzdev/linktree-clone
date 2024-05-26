import React from "react";
import PreviewButton from "@/app/dashboard/_components/PreviewButton";

type Props = {
    children?: React.ReactNode
}

const Layout = ({children}: Props) => {
    return <main className="flex bg-dashboard-background min-h-screen relative" style={{
        ['--bg-background' as any]: 'var(--gray-100)'
    }}>
        {children}
        <PreviewButton/>
    </main>
}

export default Layout;