import React from "react";
import {AppearanceSettings} from "../../../../../types/models";
import Typography from "@/components/ui/typography";
import Image from 'next/image';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

type Props =
    {
        children?: React.ReactNode,
        className?: string,
        data: Pick<AppearanceSettings, 'profile_avatar' | 'profile_avatar_url' | 'profile_title' | 'profile_initials' | 'profile_bio' | 'profile_image_style'>
    }


const ProfileInfo = ({
                         data: {
                             profile_avatar_url,
                             profile_bio,
                             profile_title,
                             profile_initials,
                             profile_image_style
                         },
                         className
                     }: Props) => {
    return <div className={cn("flex flex-col items-center text-center relative w-full select-none", className)}>
        {profile_image_style === "1" ? (
            <Avatar
                className="h-[120px] w-[120px] min-w-[120px] min-h-[120px] md:h-[144px] md:w-[144px] md:min-w-[144px] md:min-h-[144px] mt-[95px] md:mt-[100px] ">
                <AvatarImage asChild src={profile_avatar_url}>
                    <Image
                        priority
                        fill
                        style={{
                            objectFit: 'cover'
                        }}
                        src={profile_avatar_url}
                        alt={profile_title}
                    />
                </AvatarImage>
                <AvatarFallback className={"text-2xl lg:text-3xl text-white"}>{profile_initials}</AvatarFallback>
            </Avatar>
        ) : (
            <div className={'min-w-full min-h-auto aspect-[700/400] relative'}>
                <Image
                    priority
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                    src={profile_avatar_url}
                    alt={profile_title}
                />
                <div
                    className={'h-[100%] absolute -bottom-1 right-0 w-full z-10'} style={{
                    background: `linear-gradient(to bottom,transparent,var(--bg-color))`
                }}></div>
            </div>
        )}
        {profile_title && <Typography variant="h2" className={'mt-4'}>@{profile_title}</Typography>}
        {profile_bio && <Typography variant="p" className={'mt-1'}>{profile_bio}</Typography>}
    </div>
}

export default ProfileInfo;