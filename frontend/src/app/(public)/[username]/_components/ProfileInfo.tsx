import React from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {AppearanceSettings} from "@/types/models";
import Typography from "@/components/ui/typography";

type Props =
    {
        children?: React.ReactNode,
        data: Pick<AppearanceSettings, 'profile_avatar' | 'profile_avatar_url' | 'profile_title' | 'profile_bio' | 'profile_image_style'>
    }


const ProfileInfo = ({data:{profile_avatar_url, profile_bio, profile_title}}: Props) => {
    return <div className="'flex flex-col items-center text-center">
        <Avatar className="min-h-[144px] min-w-[144px] mx-auto">
            <AvatarImage src={profile_avatar_url} draggable={false}></AvatarImage>
        </Avatar>
        {profile_title && <Typography variant="h2" className={'mt-4'}>@{profile_title}</Typography>}
        {profile_bio && <Typography variant="p" className={'mt-1'}>{profile_bio}</Typography>}
    </div>
}

export default ProfileInfo;