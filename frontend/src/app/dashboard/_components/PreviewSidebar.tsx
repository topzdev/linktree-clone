"use client";

import React from "react";
import { cn } from "@/lib/utils";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import ProfilePreview from "@/app/dashboard/_components/ProfilePreview";
import ShareMenu, {
    ShareMenuButton,
    ShareMenuButtonSkeleton,
} from "@/app/dashboard/_components/ShareMenu";
import useAppAuth from "@/hooks/useAppAuth";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

const PreviewSidebar = ({ className }: Props) => {
    const { user } = useAppAuth();
    const { data } = useFetchAppearance();
    return (
        <aside
            className={cn(
                "relative flex flex-col items-center justify-center overflow-auto bg-background border-l border-transparent dark:border-border",
                className,
            )}
        >
            {/*<div className={"absolute left-0 top-0 w-full text-sm"}>*/}
            {/*    <ConsoleLog className={"!bg-transparent"} data={data} />*/}
            {/*</div>*/}
            {user && data ? (
                <ShareMenu
                    username={user.username}
                    description={data.profile_bio}
                >
                    <ShareMenuButton
                        size={"lg"}
                        className={"absolute top-8 right-8"}
                    />
                </ShareMenu>
            ) : (
                <ShareMenuButtonSkeleton
                    size={"lg"}
                    className={"absolute top-8 right-8"}
                />
            )}

            <ProfilePreview />
        </aside>
    );
};

export default PreviewSidebar;
