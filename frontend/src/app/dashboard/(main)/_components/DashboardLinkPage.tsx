"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import {useQuery} from "@tanstack/react-query";
import linkServices from "@/services/links";
import LinksList from "@/app/dashboard/(main)/_components/LinksList";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import dynamic from "next/dynamic";
import {useBreakpoint} from "@/hooks/useBreakpoint";
import AddButtons from "@/app/dashboard/(main)/_components/links/AddButtons";

type Props = {
    children?: React.ReactNode
}

const AddLinkMainFormDialog = dynamic(() => import('./links/AddLinkMainFormDialog'), {ssr: false})
const AddLinkMainFormCard = dynamic(() => import('./links/AddLinkMainFormCard'), {ssr: false})

const DashboardLinkPage = (props: Props) => {
    const {isMd} = useBreakpoint('md');

    const {data} = useQuery({
        queryKey: ['links'],
        queryFn: () => linkServices.getAll()
    })


    return <DashboardContainer>
        <div className="flex flex-col gap-y-5 w-full">
            <div className={'flex flex-col gap-y-2.5'}>
                <Typography as="h1" variant={'h2'}>
                    Links
                </Typography>

                <AddButtons/>

                {isMd ? <AddLinkMainFormCard/> : <AddLinkMainFormDialog/>}
            </div>

            {data && <LinksList links={data}/>}

        </div>
    </DashboardContainer>
}

export default DashboardLinkPage;