import React from "react";
import {AppearanceSettings} from "../../../../../types/models";
import Typography from "@/components/ui/typography";
import Image from 'next/image';
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";

type Props =
    {
        children?: React.ReactNode,
        data: Pick<AppearanceSettings, 'profile_avatar' | 'profile_avatar_url' | 'profile_title' | 'profile_initials' | 'profile_bio' | 'profile_image_style'>
    }


const ProfileInfo = ({data: {profile_avatar_url, profile_bio, profile_title, profile_initials}}: Props) => {
    return <div className="'flex flex-col items-center text-center">
        <Avatar  className="h-[120px] w-[120px] min-w-[120px] min-h-[120px] md:h-[144px] md:w-[144px] md:min-w-[144px] md:min-h-[144px]">
            <AvatarImage asChild src={profile_avatar_url}>
                <Image
                    priority
                    src={profile_avatar_url}
                    alt={profile_title}
                    width={144}
                    height={144}
                />
            </AvatarImage>
            <AvatarFallback className={"text-2xl lg:text-3xl text-white"}>{profile_initials}</AvatarFallback>
        </Avatar>
        {profile_title && <Typography variant="h2" className={'mt-4'}>@{profile_title}</Typography>}
        {profile_bio && <Typography variant="p" className={'mt-1'}>{profile_bio}</Typography>}
    </div>
}

export default ProfileInfo;