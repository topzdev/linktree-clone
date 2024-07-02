"use client"

import React from "react";
import ProfileInfo from "@/app/(public)/[username]/_components/ProfileInfo";
import LinkListContainer from "@/app/(public)/[username]/_components/LinkListContainer";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "../../../../../types/models";
import {useQuery} from "@tanstack/react-query";
import profileCssVariables from "@/lib/profileCssVariables";
import SocialIconsList from "@/app/(public)/[username]/_components/SocialIconsList";
import AppLogo from "@/components/common/AppLogo";
import {getImageProps} from 'next/image';

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

    const backgroundStyle: React.CSSProperties = {};
    let images = {
        mobile: "",
        desktop: "",
    };
    let video = '';
    backgroundStyle.color = appearance_settings.font_color || 'var(--foreground)';
    switch (appearance_settings.bg_id) {
        case 1:
            backgroundStyle.background = appearance_settings.bg_color || '#fff';
            break;
        case 2:
            const position = appearance_settings.bg_position || '180deg'
            backgroundStyle.background = `linear-gradient(${position},${appearance_settings.bg_to},${appearance_settings.bg_from})`;
            break;
        case 3:
            const common = {alt: 'Theme Background'}

            if (appearance_settings.bg_image_url) {
                const desktop = getImageProps({
                    ...common,
                    width: 1920, height: 1080,
                    src: appearance_settings.bg_image_url
                });
                images.desktop = desktop.props.src;
            }
            if (appearance_settings.bg_image_m_url) {
                const mobile = getImageProps({
                    ...common,
                    width: 887, height: 1921,
                    src: appearance_settings.bg_image_m_url
                });
                images.mobile = mobile.props.src;
            }
            break;
        case 4:
            if (appearance_settings.bg_video_url) {
                video = appearance_settings.bg_video_url;
            }
            break;
        default:
            backgroundStyle.background = 'var(--background)';
            backgroundStyle.color = 'var(--foreground)';
            break;
    }


    return <div
        style={{
            ...profileCssVariables({
                btn_shadow_color: appearance_settings.btn_shadow_color,
                btn_text_color: appearance_settings.btn_text_color,
                btn_color: appearance_settings.btn_color
            }),
            ...backgroundStyle
        }}
        className="max-h-screen overflow-hidden relative">
        {video && <video autoPlay muted loop className={'absolute top-0 left-0 h-screen object-cover w-screen'}>
            <source className={'h-full w-full object-cover object-center'} src={video} type="video/mp4"/>
        </video>}
        {images.desktop && images.mobile && <picture className={'absolute top-0 left-0 h-full w-full'}>
            {images.mobile && <source media={`(max-width: 767px)`} srcSet={images?.mobile}/>}
            <source media={`(min-width: 768px)`} srcSet={images?.desktop}/>
            <img className={'h-full w-full object-cover object-center'} alt={'Theme Background'} src={images?.desktop}/>
        </picture>}

        <div className={'py-[95px] md:py-[100px] h-full w-full overflow-auto max-h-screen relative z-100'}>
            <div
                className='px-5 md:px-0 max-w-[700px] flex flex-col items-center mx-auto gap-y-10 md:gap-y-[60px]'>
                <ProfileInfo data={appearance_settings}/>
                <LinkListContainer button={appearance_settings.button} links={links}/>
                <SocialIconsList socials={socials}></SocialIconsList>
                <AppLogo/>
            </div>
        </div>
    </div>
}

export default ProfilePage;