import React from "react";
import {apiClient} from "@/lib/ofetch";
import {ProfileData} from "@/types/models";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import ProfilePage from "@/app/(public)/[username]/_components/ProfilePage";

type Props = {
    params: { username: string }
}

const Page = async ({params}: Props) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () => apiClient.get<ProfileData>(`/preview/${params.username}`),
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilePage username={params.username}/>
    </HydrationBoundary>
}

export default Page;