"use client";

import React from "react";
import { cn } from "@/lib/utils";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import ProfilePreview from "@/app/dashboard/_components/ProfilePreview";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

const PreviewSidebar = ({ className }: Props) => {
    const { data } = useFetchAppearance();
    return (
        <aside
            className={cn(
                "relative flex flex-col items-center justify-center overflow-auto bg-background dark:border dark:border-border",
                className,
            )}
        >
            {/*<div className={"absolute left-0 top-0 w-full text-sm"}>*/}
            {/*    <ConsoleLog className={"!bg-transparent"} data={data} />*/}
            {/*</div>*/}
            <ProfilePreview />
        </aside>
    );
};

export default PreviewSidebar;
