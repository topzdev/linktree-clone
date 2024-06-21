"use client"
import React from "react";
import SocialListModal from "@/app/dashboard/(main)/socials/_components/SocialListModal";

type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    return <>
        <SocialListModal/>
    </>
}

export default Page;