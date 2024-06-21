import React from "react";
import DashboardLinkPage from "@/app/dashboard/(main)/_components/DashboardLinkPage";
import {Metadata} from "next";
import DashboardSettingsPage from "@/app/dashboard/(main)/socials/_components/DashboardSettingsPage";

type Props = {
    children?: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Settings',
}

const Page = ({children}: Props) => {
    return <>
        <DashboardSettingsPage/>
        {children}
    </>
}

export default Page;
