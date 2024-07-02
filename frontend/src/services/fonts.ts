import {apiClient} from "@/lib/ofetch";
import {AppearanceSettings, Font} from "../../types/models";
import {FontsForm} from "@/app/dashboard/(main)/settings/_components/FontsForm";

const basePath = '/fonts'

export type ReturnFont = Pick<AppearanceSettings, 'id' | 'user_id' | 'font_id' | 'font_color'> & {
    font: Font;
}


const fontsServices = {
    getOne: async () => {
        return apiClient.get<ReturnFont>(`${basePath}/user`);
    },
    update: async (data?: FontsForm) => {
        return apiClient.post<ReturnFont>(`${basePath}/update/`, {
            body: data
        })
    },
}

export default fontsServices;