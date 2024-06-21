import React from "react";
import {Metadata} from "next";
import dynamic from "next/dynamic";

type Props = {
    children?: React.ReactNode
}


const SocialListModal = dynamic(() => import('@/app/dashboard/(main)/socials/_components/SocialListModal'), {ssr: false})


export const metadata: Metadata = {
    title: 'Choose Socials',
}

const Page = (props: Props) => {
    return <>
       <SocialListModal/>
    </>
}

export default Page;