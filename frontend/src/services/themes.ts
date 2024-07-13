import { apiClient } from "@/lib/ofetch";
import { AppearanceSettings, Font, Theme } from "../../types/models";
import { CustomThemeForm } from "@/app/dashboard/(main)/appearance/_components/custom/CustomThemeForm";
import { ThemesForm } from "@/app/dashboard/(main)/appearance/_components/themes/ThemesForm";

const basePath = "/themes";

export type UpdateTheme = Pick<AppearanceSettings, "theme_id">;
export type UpdateCustomTheme = Pick<
    AppearanceSettings,
    "bg_color" | "bg_from" | "bg_to" | "bg_position" | "bg_id"
> & {
    bg_video: AppearanceSettings["bg_video"] | File;
    bg_image: AppearanceSettings["bg_image"] | File;
};

export type ReturnTheme = Pick<
    AppearanceSettings,
    | "id"
    | "theme_id"
    | "bg_image"
    | "bg_video"
    | "bg_color"
    | "bg_from"
    | "bg_to"
    | "bg_id"
    | "bg_position"
    | "bg_video_url"
    | "bg_image_url"
> & {
    font: Font;
};

export type ThemesPreview = Pick<Theme, "id" | "title" | "key" | "preview_url">;

export type GetOneReturn = ReturnTheme & {
    themes: ThemesPreview[];
};

const themesServices = {
    getThemes: async () => {
        return apiClient.get<ThemesPreview[]>(`${basePath}/`);
    },
    getOne: async () => {
        return apiClient.get<GetOneReturn>(`${basePath}/user`);
    },
    update: async (data?: ThemesForm) => {
        return apiClient.post<ReturnTheme>(`${basePath}/update/`, {
            body: data,
        });
    },
    updateCustom: async (data: CustomThemeForm) => {
        const formData = new FormData();
        const id = data.bg_id;
        formData.append("bg_id", id.toString());
        switch (id) {
            case 1:
                data.bg_color && formData.append("bg_color", data.bg_color);
                break;
            case 2:
                data.bg_from && formData.append("bg_from", data.bg_from);
                data.bg_to && formData.append("bg_to", data.bg_to);
                data.bg_position &&
                    formData.append("bg_position", data.bg_position);
                break;
            case 3:
                data.bg_image &&
                    formData.append("bg_image", data.bg_image as File);
                break;
            case 4:
                data.bg_video &&
                    formData.append("bg_video", data.bg_video as File);
                break;
        }

        return apiClient.post<ReturnTheme>(`${basePath}/update/custom`, {
            body: formData,
        });
    },
};

export default themesServices;
