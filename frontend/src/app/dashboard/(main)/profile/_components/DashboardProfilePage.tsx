"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import {useQuery} from "@tanstack/react-query";
import linkServices from "@/services/links";
import LinksList, {LinkListSkeleton} from "@/app/dashboard/(main)/_components/links/LinksList";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import dynamic from "next/dynamic";
import {useBreakpoint} from "@/hooks/useBreakpoint";
import AddButtons from "@/app/dashboard/(main)/_components/links/AddButtons";
import profileServices from "@/services/profile";
import ProfileForm from "@/app/dashboard/(main)/profile/_components/ProfileForm";

type Props = {
    children?: React.ReactNode
}

const DashboardProfilePage = (props: Props) => {
    const {isMd} = useBreakpoint('md');

    const {data, isLoading} = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileServices.getOne(),
    })

    return <DashboardContainer>
        <div className="flex flex-col gap-y-5 w-full">
            <div className={'flex flex-col relative'}>
                <Typography as="h1" variant={'h2'}>
                   Profile
                </Typography>
            </div>
            {data && <ProfileForm value={data}/> }
        </div>
    </DashboardContainer>
}

export default DashboardProfilePage;