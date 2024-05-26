"use client";

import React from "react";
import PreviewFrame from "@/app/dashboard/_components/PreviewFrame";

type Props = {
    children?: React.ReactNode,
}

const ProfilePreview = () => {
    return <div
        className={'bg-black border-4 border-gray-700 p-1 rounded-3xl h-[715px] w-[364px] shadow-lg overflow-hidden'}>
        <PreviewFrame/>
    </div>
}

export default ProfilePreview;