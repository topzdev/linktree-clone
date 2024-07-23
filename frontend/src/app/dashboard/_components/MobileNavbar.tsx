"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AppLogoIcon from "@/components/common/AppLogoIcon";
import ShareMenu, {
    ShareMenuButton,
    ShareMenuButtonSkeleton,
} from "@/app/dashboard/_components/ShareMenu";
import useAppAuth from "@/hooks/useAppAuth";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";

type Props = {
    children?: React.ReactNode;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

const MobileNavbar = ({ className, ...props }: Props) => {
    const { user } = useAppAuth();
    const { data } = useFetchAppearance();
    return (
        <nav
            className={cn(
                "fixed top-0 h-[70px] w-full flex bg-background items-center border-b px-5",
                className,
            )}
            {...props}
        >
            <AppLogoIcon
                className={"text-primary h-[30px] max-h-[30px] flex"}
            />
            {user && data ? (
                <ShareMenu
                    username={user.username}
                    description={data.profile_bio}
                >
                    <ShareMenuButton className={"ml-auto"} />
                </ShareMenu>
            ) : (
                <ShareMenuButtonSkeleton className={"ml-auto"} />
            )}
        </nav>
    );
};

export default MobileNavbar;
