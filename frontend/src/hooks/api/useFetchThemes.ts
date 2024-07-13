import { useQuery } from "@tanstack/react-query";
import themesServices from "@/services/themes";

const useFetchThemes = () => {
    return useQuery({
        queryKey: ["themes"],
        queryFn: () => themesServices.getThemes(),
    });
};

export default useFetchThemes;
