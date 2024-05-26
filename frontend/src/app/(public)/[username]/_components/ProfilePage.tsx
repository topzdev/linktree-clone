"use client"

import React from "react";
import ProfileInfo from "@/app/(public)/[username]/_components/ProfileInfo";
import LinkListContainer from "@/app/(public)/[username]/_components/LinkListContainer";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "@/types/models";
import {useQuery} from "@tanstack/react-query";
import profileCssVariables from "@/lib/profileCssVariables";
import SocialIconsList from "@/app/(public)/[username]/_components/SocialIconsList";
import AppLogo from "@/components/common/AppLogo";

type Props = {
    children?: React.ReactNode,
    username: string
}

const ProfilePage = ({username}: Props) => {

    const {data} = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: () => apiClient.get<ProfileData>(`/preview/${username}`),
    })

    if (!data) return <></>
    const appearance_settings = data.appearance_settings;
    const links = data.links;
    const socials = data.socials;

    const backgrounds = [appearance_settings.bg_color, appearance_settings.bg_color2].filter(item => item);
    const backgroundStyle: React.CSSProperties = {};

    backgroundStyle.color = appearance_settings.font_color || 'var(--foreground)';
    switch (appearance_settings.background?.key) {
        case 'flat':
            backgroundStyle.background = backgrounds[0] || '#fff';
            break;
        case 'gradient':
            const position = appearance_settings.bg_position || '180deg'
            backgroundStyle.background = `linear-gradient(${position},${backgrounds[0]},${backgrounds[1]})`;
            break;
        default:
            backgroundStyle.background = 'var(--background)';
            backgroundStyle.color = 'var(--foreground)';
            break;
    }

    return <div
        style={{
            ...profileCssVariables({
                btn_shadow_color: data.appearance_settings.btn_shadow_color,
                btn_text_color: data.appearance_settings.btn_text_color,
                btn_color: data.appearance_settings.btn_color
            }),
            ...backgroundStyle
        }}
        className="py-[95px] md:py-[100px] min-h-screen">
        {}
        <div className='px-5 md:px-0 max-w-[700px] flex flex-col items-center mx-auto gap-y-10 md:gap-y-[60px]'>
            <ProfileInfo data={data.appearance_settings}/>
            <LinkListContainer button={data.appearance_settings.button} links={links}/>
            <SocialIconsList socials={socials}></SocialIconsList>
            <AppLogo/>
        </div>
    </div>
}

export default ProfilePage;