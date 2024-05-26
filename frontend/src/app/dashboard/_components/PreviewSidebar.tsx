"use client"

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import ProfilePreview from "@/app/dashboard/_components/ProfilePreview";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import useDashboardStore from "@/stores/dashboard";

type Props = {
    children?: React.ReactNode,
    className?: string,
}

const PreviewSidebar = ({className}: Props) => {
    return <aside className={cn("bg-background flex items-center justify-center", className)}>
        <ProfilePreview />
    </aside>
}

export default PreviewSidebar;
