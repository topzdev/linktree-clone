import React from "react";
import DashboardLinkPage from "@/app/dashboard/(main)/_components/DashboardLinkPage";
import {Metadata} from "next";

type Props = {
    children?: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Links',
}

const Page = (props: Props) => {
    return <DashboardLinkPage/>
}

export default Page;