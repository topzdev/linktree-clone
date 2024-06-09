import {apiClient} from "@/lib/ofetch";
import {AppearanceSettings} from "../../types/models";
import {UpdateThumbnail} from "@/services/links";

const basePath = '/profile'

export type UpdateProfile = Pick<AppearanceSettings, 'profile_bio' | 'profile_image_style' | 'profile_title'>

export type ReturnProfile = Pick<AppearanceSettings, 'id' | 'user_id' | 'profile_avatar' | 'profile_bio' | 'profile_image_style' | 'profile_title' | 'updated_at' | 'profile_avatar_url' | 'profile_initials' | 'bg_image_url' | 'bg_video_url'>


const profileServices = {
    getOne: async () => {
        return apiClient.get<ReturnProfile>(`${basePath}`);
    },
    update: async (data?: UpdateProfile) => {
        return apiClient.post<ReturnProfile>(`${basePath}/update/`, {
            body: data
        })
    },
    updateAvatar: async (image?: File) => {
        const formData = new FormData();

        if (image) {
            formData.append('avatar', image);
        }
        return apiClient.post<UpdateThumbnail>(`${basePath}/update/avatar`, {
            body: formData,
        })
    },
    deleteAvatar: async () => {
        return apiClient.delete(`${basePath}/remove/avatar`);
    },

}

export default profileServices;