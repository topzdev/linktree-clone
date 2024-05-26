import React from "react";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "@/types/models";
import {dehydrate, HydrationBoundary, QueryClient, useQuery} from "@tanstack/react-query";
import ProfilePage from "@/app/(public)/[username]/_components/ProfilePage";
import {Metadata, ResolvingMetadata} from "next";

type Props = {
    params: { username: string }
}

const queryClient = new QueryClient();

export async function generateMetadata(
    { params}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const data = await queryClient.fetchQuery({
        queryKey: ['profile'],
        queryFn: () => apiClient.get<ProfileData>(`/preview/${params.username}`),
    })

    // optionally access and extend (rather than replace) parent metadata
    const images =  [data?.appearance_settings.profile_avatar_url].filter(item => item) as string[]

    return {
        title: data?.appearance_settings.profile_title,
        description: data?.appearance_settings.profile_bio,
        openGraph: {
            images: images ? images : [],
        },
    }
}

const Page = async ({params}: Props) => {

    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () => apiClient.get<ProfileData>(`/preview/${params.username}`),
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilePage username={params.username}/>
    </HydrationBoundary>
}

export default Page;