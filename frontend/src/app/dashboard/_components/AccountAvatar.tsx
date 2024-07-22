import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarSkeleton,
} from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import { AvatarProps } from "@radix-ui/react-avatar";
import MaterialSymbolsPersonOutline from "@/components/icons/MaterialSymbolsPersonOutline";

type Props = AvatarProps;
const AccountAvatar = ({ className, ...props }: Props) => {
    const { data } = useFetchAppearance();
    return (
        <Avatar className={className} {...props}>
            {data && data.profile_avatar_url && (
                <AvatarImage asChild src={data?.profile_avatar_url || ""}>
                    <Image
                        src={data?.profile_avatar_url || ""}
                        alt={data?.profile_title || ""}
                        width={54}
                        height={54}
                    />
                </AvatarImage>
            )}
            <AvatarFallback
                className={"text-muted-foreground text-xl bg-muted rounded-lg"}
            >
                {data?.profile_initials ? (
                    data?.profile_initials
                ) : (
                    <MaterialSymbolsPersonOutline />
                )}
            </AvatarFallback>
        </Avatar>
    );
};

export const AccountAvatarSkeleton = ({ className }: Props) => {
    return <AvatarSkeleton className={className} />;
};
export default AccountAvatar;
