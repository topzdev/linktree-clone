import React from "react";
import ofetch, {apiClient} from "@/lib/ofetch";

type Props = {
    params: { username: string }
}


const Page = async({params}: Props) => {
    const data = await apiClient.get(`/preview/${params.username}`);

    console.log(data);
    return <>
        {JSON.stringify(data)}
    </>
}

export default Page;