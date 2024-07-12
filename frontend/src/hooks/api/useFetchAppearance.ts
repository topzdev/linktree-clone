import { useQuery, useQueryClient } from "@tanstack/react-query";
import appearanceServices from "@/services/appearance";
import { AppearanceSettings } from "../../../types/models";

const queryKey = ["appearance"];
const useFetchAppearance = () => {
    return useQuery({
        queryKey,
        queryFn: () => appearanceServices.getOne(),
    });
};

export const useUpdateAppearance = () => {
    const queryClient = useQueryClient();

    return (data: Partial<AppearanceSettings>) => {
        queryClient.setQueryData(
            ["appearance"],
            (prevData: AppearanceSettings | undefined) => {
                return prevData
                    ? {
                          ...prevData,
                          ...data,
                      }
                    : prevData;
            },
        );
    };
};

export default useFetchAppearance;
