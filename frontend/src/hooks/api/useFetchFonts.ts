import {useQuery} from "@tanstack/react-query";
import fontsServices from "@/services/fonts";

const useFetchFonts = () => {
    return useQuery({
        queryKey: ['fonts'],
        queryFn: () => fontsServices.getOne(),
    })
}

export default useFetchFonts;