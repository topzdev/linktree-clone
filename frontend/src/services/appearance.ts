import { apiClient } from "@/lib/ofetch";
import { AppearanceSettings } from "../../types/models";

const basePath = "/appearance";

const appearanceServices = {
    getOne: async () => {
        return apiClient.get<AppearanceSettings>(`${basePath}`);
    },
};

export default appearanceServices;
