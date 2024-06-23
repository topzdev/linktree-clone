import {apiClient} from "@/lib/ofetch";
import {AppearanceSettings, Font} from "../../types/models";

const basePath = '/fonts'

export type UpdateFont = Pick<AppearanceSettings, 'profile_bio' | 'profile_image_style' | 'profile_title'>

export type ReturnFont = Pick<AppearanceSettings, 'id' | 'user_id' | 'font_id' | 'font_color'> & {
    font: Font;
}


const fontsServices = {
    getOne: async () => {
        return apiClient.get<ReturnFont>(`${basePath}/user`);
    },
    update: async (data?: UpdateFont) => {
        return apiClient.post<ReturnFont>(`${basePath}/update/`, {
            body: data
        })
    },
}

export default fontsServices;