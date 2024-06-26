import {useQuery} from "@tanstack/react-query";
import themesServices from "@/services/themes";

const useFetchFonts = () => {
    return useQuery({
        queryKey: ['theme'],
        queryFn: () => themesServices.getOne(),
    })
}

export default useFetchFonts;