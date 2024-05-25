import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AppearanceSettings} from "@/types/models";
import Typography from "@/components/ui/typography";
import Image from 'next/image';

type Props =
    {
        children?: React.ReactNode,
        data: Pick<AppearanceSettings, 'profile_avatar' | 'profile_avatar_url' | 'profile_title' | 'profile_initials' | 'profile_bio' | 'profile_image_style'>
    }


const ProfileInfo = ({data: {profile_avatar_url, profile_bio, profile_title, profile_initials}}: Props) => {
    return <div className="'flex flex-col items-center text-center">
        <Avatar className="h-[144px] w-[144px] min-w-[144px] min-h-[144px] mx-auto">
            <AvatarImage asChild src={profile_avatar_url} draggable={false}>
                <Image
                    loading="eager"
                    priority
                    src={profile_avatar_url}
                    fill={true}
                    alt={profile_title}
                    sizes="(min-width: 808px) 144px"
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}/>
            </AvatarImage>
            <AvatarFallback className={'bg-background text-foreground text-2xl'}>{profile_initials}</AvatarFallback>
        </Avatar>
        {profile_title && <Typography variant="h2" className={'mt-4'}>@{profile_title}</Typography>}
        {profile_bio && <Typography variant="p" className={'mt-1'}>{profile_bio}</Typography>}
    </div>
}

export default ProfileInfo;