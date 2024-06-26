import {apiClient} from "@/lib/ofetch";
import {AppearanceSettings, Font} from "../../types/models";

const basePath = '/themes'

export type UpdateTheme = Pick<AppearanceSettings, 'theme_id'>;
export type UpdateCustomTheme = Pick<AppearanceSettings, 'bg_color' | 'bg_color2' | 'bg_position' | 'bg_id' | 'bg_video' | 'bg_image'>;

export type ReturnTheme =
    Pick<AppearanceSettings, 'id' | 'theme_id' | 'bg_image' | 'bg_video' | 'bg_color' | 'bg_color2' | 'bg_id' | 'bg_position' | 'bg_video_url' | 'bg_image_url'>
    & {
    font: Font;
}


const themesServices = {
    getOne: async () => {
        return apiClient.get<ReturnTheme>(`${basePath}/user`);
    },
    update: async (data?: UpdateTheme) => {
        return apiClient.post<ReturnTheme>(`${basePath}/update/`, {
            body: data
        })
    },
    updateCustom: async (data?: UpdateCustomTheme) => {
        return apiClient.post<ReturnTheme>(`${basePath}/update/custom`, {
            body: data
        })
    },
}

export default themesServices;