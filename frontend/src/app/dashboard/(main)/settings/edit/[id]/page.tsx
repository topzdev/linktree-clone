import React from "react";
import {Metadata} from "next";
import dynamic from "next/dynamic";

type Props = {
    children?: React.ReactNode
}

const EditSocialFormModal = dynamic(() => import('@/app/dashboard/(main)/settings/_components/EditSocialFormModal'), {ssr: false})

export const metadata: Metadata = {
    title: 'Add Social',
}

const Page = (props: Props) => {
    return <EditSocialFormModal/>
}

export default Page;