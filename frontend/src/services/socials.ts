import {apiClient} from "@/lib/ofetch";
import {Social} from "../../types/models";

const basePath = '/socials'

export type UserSocials = {
    socials: Social[],
    alignment: 2,
}

const socialsServices = {
    getAll: async () => {
        return apiClient.get<UserSocials>(`${basePath}/user`);
    },
    getOne: async () => {
        return apiClient.get<Social>(`${basePath}`);
    },
    add: async (data?: any) => {
        return apiClient.post<Social>(`${basePath}/`, {
            body: data
        })
    },
    update: async (data?: any) => {
        return apiClient.post<Social>(`${basePath}/update/`, {
            body: data
        })
    },
    updatePositions: async (ids: number[]) => {
        return apiClient.post<Social[]>(`${basePath}/update/position`, {
            body: {
                ids: ids.join(',')
            }
        })
    },
    updateVisibility: async (id: number) => {
        return apiClient.post<boolean>(`${basePath}/update/visibility/${id}`)
    },
    updateSocialAlign: async (position: number) => {
        return apiClient.post<1|2>(`${basePath}/update/align/`, {
            body: {
                position
            }
        })
    },
    delete: async (id: string) => {
        return apiClient.delete<Social>(`${basePath}/${id}`)
    },
}

export default socialsServices;
