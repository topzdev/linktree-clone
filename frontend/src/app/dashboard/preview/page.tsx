"use client";

import React, {useEffect} from "react";
import PreviewFrame from "@/app/dashboard/_components/PreviewFrame";
import {useRouter} from "next/navigation";
import {useWindowSize } from '@uidotdev/usehooks'
import {useBreakpoint} from "@/hooks/useBreakpoint";

type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    const router = useRouter();
    const { isMd } = useBreakpoint('md');

    useEffect(() => {
        if (isMd) {
            router.back();
        }
    }, [])

    return <div className={"h-screen w-screen"}>
        <PreviewFrame/>
    </div>
}

export default Page;