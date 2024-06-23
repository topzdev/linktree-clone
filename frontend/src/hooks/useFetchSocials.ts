import {useQuery} from "@tanstack/react-query";
import socialsServices from "@/services/socials";

const useFetchSocials = () => {
    return useQuery({
        queryKey: ['socials'],
        queryFn: () => socialsServices.getAll(),
    })
}

export default useFetchSocials;