"use client"

import React from "react";
import {useQuery} from "@tanstack/react-query";
import buttonsServices from "@/services/buttons";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import Typography from "@/components/ui/typography";
import ButtonsForm, {ButtonsFormSkeleton} from "@/app/dashboard/(main)/buttons/_components/ButtonsForm";
import socialsServices from "@/services/socials";
import SocialForm, {SocialFormSkeleton} from "@/app/dashboard/(main)/settings/_components/SocialsForm";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsPage = (props: Props) => {
    const {data, isLoading} = useQuery({
        queryKey: ['socials'],
        queryFn: () => socialsServices.getAll(),
    })

    return <DashboardContainer>
        <div className="flex flex-col gap-y-5 w-full">
            <div className={'flex flex-col relative'}>
                <Typography as="h1" variant={'h2'}>
                    Social Icons
                </Typography>
            </div>

            {isLoading && <SocialFormSkeleton/>}
            {!isLoading && data && <SocialForm value={data}/>}
        </div>
    </DashboardContainer>
}

export default DashboardSettingsPage;