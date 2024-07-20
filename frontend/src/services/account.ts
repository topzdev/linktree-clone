import { apiClient } from "@/lib/ofetch";
import { MyAccountForm } from "@/app/dashboard/(main)/more/my-account/_components/MyAccountForm";
import { ChangePasswordForm } from "@/app/dashboard/(main)/more/change-password/_components/ChangePasswordForm";

const basePath = "";

const accountServices = {
    changeInfo: async (info: MyAccountForm) => {
        return apiClient.post<{ message: string }>(`${basePath}/change-info`, {
            body: info,
        });
    },
    changePassword: async (info: ChangePasswordForm) => {
        return apiClient.post<{ message: string }>(
            `${basePath}/change-password`,
            {
                body: info,
            },
        );
    },
    deleteAccount: async (code: string) => {
        return apiClient.post(`${basePath}/delete-account`, {
            body: { code },
        });
    },
};

export default accountServices;
