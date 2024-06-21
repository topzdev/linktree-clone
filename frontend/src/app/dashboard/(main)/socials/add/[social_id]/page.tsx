import React from "react";
import {Metadata} from "next";
import dynamic from "next/dynamic";

type Props = {
    children?: React.ReactNode
}

const AddSocialFormModal = dynamic(() => import('@/app/dashboard/(main)/socials/_components/AddSocialFormModal'), {ssr: false})

export const metadata: Metadata = {
    title: 'Add Social',
}

const Page = (props: Props) => {
    return <AddSocialFormModal/>
}

export default Page;