"use client"

import React from "react";
import {useSession} from "next-auth/react";
import useDashboardStore from "@/stores/dashboard";
import pageRoutes from "@/configs/page-routes";

type Props = {
    children?: React.ReactNode
}

const PreviewFrame = (props: Props) => {
    const {data: session} = useSession();
    const username = session?.user.username;
    const timestamp = useDashboardStore(state => state.previewTimestamp);
    const link = pageRoutes.profile(username || '').href + '?t='+timestamp;

    return <>
        {session && <iframe className={'h-full w-full'} src={link}></iframe>}
    </>
}

export default PreviewFrame;