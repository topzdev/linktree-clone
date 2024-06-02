"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {ProfileData} from "../../../../../types/models";
import {apiClient} from "@/lib/ofetch";
import linkServices from "@/services/links";
import LinksList from "@/app/dashboard/(main)/_components/LinksList";

type Props = {
    children?: React.ReactNode
}

const DashboardLinkPage = (props: Props) => {

    const {data} = useQuery({
        queryKey: ['links'],
        queryFn: () => linkServices.getAll()
    })


    return <div className="flex flex-col gap-y-5 w-full">
        <div className={'flex flex-col gap-y-2.5'}>
            <Typography as="h1" variant={'h2'}>
                Links
            </Typography>

            <Button rounded size={'lg'} className="w-full">Add Link</Button>

        </div>

        {data && <LinksList links={data}/> }
    </div>
}

export default DashboardLinkPage;