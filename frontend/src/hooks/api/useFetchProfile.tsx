import { QueryClient, useQuery } from "@tanstack/react-query";
import { ProfileData } from "../../../types/models";
import { apiClient } from "@/lib/ofetch";

export const queryClient = new QueryClient();

const getProfile = async (username: string): Promise<ProfileData> => {
    return apiClient
        .get<ProfileData>(`/preview/${username}`)
        .then((data) => data)
        .catch((err) => {
            throw err;
        });
    // return fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/${username}`)
    //     .then((res) => res.json())
    //     .catch((err) => {
    //         return err;
    //     });
};

const queryKey = "profile";

const useFetchProfile = (username: string) => {
    return useQuery<ProfileData>({
        queryKey: [queryKey],
        // queryFn: () => ,
        queryFn: () => getProfile(username),
        retry: false,
    });
};

export const useFetchProfileQuery = (username: string) => {
    return queryClient.fetchQuery({
        queryKey: [queryKey],
        queryFn: () => getProfile(username),
    });
};

export const usePreFetchProfileQuery = (username: string) => {
    return queryClient.prefetchQuery({
        queryKey: [queryKey],
        queryFn: () => getProfile(username),
    });
};

export default useFetchProfile;
