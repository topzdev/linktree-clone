"use client"

import React from "react";
import ProfileInfo from "@/app/(public)/[username]/_components/ProfileInfo";
import LinkListContainer from "@/app/(public)/[username]/_components/LinkListContainer";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "@/types/models";
import {useQuery} from "@tanstack/react-query";
import profileCssVariables from "@/lib/profileCssVariables";

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

    return <div
        style={profileCssVariables({
            btn_shadow_color: data.appearance_settings.btn_shadow_color,
            btn_text_color: data.appearance_settings.btn_text_color,
            btn_color: data.appearance_settings.btn_color
        })}
        className="bg-primary py-[100px] h-screen">

        <div className='max-w-[700px] flex flex-col items-center mx-auto gap-y-[60px]'>
            <ProfileInfo data={data.appearance_settings}/>
            <LinkListContainer button={data.appearance_settings.button} links={data.links}/>
        </div>
    </div>
}

export default ProfilePage;