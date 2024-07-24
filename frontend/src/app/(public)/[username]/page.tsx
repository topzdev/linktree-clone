import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProfilePage from "@/app/(public)/[username]/_components/ProfilePage";
import { Metadata, ResolvingMetadata } from "next";
import {
    queryClient,
    useFetchProfileQuery,
    usePreFetchProfileQuery,
} from "@/hooks/api/useFetchProfile";

type Props = {
    params: { username: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    try {
        const data = await useFetchProfileQuery(params.username);

        // optionally access and extend (rather than replace) parent metadata
        const images = [data?.appearance_settings.profile_avatar_url].filter(
            (item) => item,
        ) as string[];

        return {
            title: data?.appearance_settings.profile_title,
            description: data?.appearance_settings.profile_bio,
            openGraph: {
                images: images ? images : [],
            },
        };
    } catch (e: any) {
        console.log(e);
        return {
            title: e.data.message,
        };
    }
}

const Page = async ({ params }: Props) => {
    await usePreFetchProfileQuery(params.username);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfilePage username={params.username} />
        </HydrationBoundary>
    );
};

export default Page;
