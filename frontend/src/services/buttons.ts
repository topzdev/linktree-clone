import {apiClient} from "@/lib/ofetch";
import {AppearanceSettings} from "../../types/models";
import {UpdateThumbnail} from "@/services/links";
import {ButtonForm} from "@/app/dashboard/(main)/buttons/_components/ButtonsForm";

const basePath = '/buttons'

export type UpdateButtonsSettings = Pick<AppearanceSettings,  'btn_color' | 'btn_text_color' | 'btn_shadow_color' | 'btn_id'>

export type ReturnButtonsSettings = Pick<AppearanceSettings, 'id' | 'user_id' | 'btn_color' | 'btn_text_color' | 'btn_shadow_color'  | 'updated_at' | 'profile_avatar_url' | 'profile_initials' | 'bg_image_url' | 'bg_video_url'>


const buttonsServices = {
    getOne: async () => {
        return apiClient.get<ReturnButtonsSettings>(`${basePath}`);
    },
    update: async (data?: ButtonForm) => {
        return apiClient.post<ReturnButtonsSettings>(`${basePath}/update/`, {
            body: data
        })
    },

}

export default buttonsServices;