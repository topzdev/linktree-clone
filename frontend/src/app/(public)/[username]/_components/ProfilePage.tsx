"use client"

import React from "react";
import ProfileInfo from "@/app/(public)/[username]/_components/ProfileInfo";
import LinkListContainer from "@/app/(public)/[username]/_components/LinkListContainer";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "@/types/models";
import {useQuery} from "@tanstack/react-query";

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

    return <div className="bg-primary py-[100px] h-screen">

        <div className='max-w-[700px] flex flex-col items-center mx-auto gap-y-[60px]'>
            <ProfileInfo data={data.appearance_settings}/>
            <LinkListContainer links={data.links}/>
        </div>
    </div>
}

export default ProfilePage;