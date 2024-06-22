"use client"

import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import Typography from "@/components/ui/typography";
import SocialForm, {SocialFormSkeleton} from "@/app/dashboard/(main)/socials/_components/SocialsForm";
import useFetchSocials from "@/hooks/useFetchSocials";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsPage = (props: Props) => {
    const {isLoading, data} = useFetchSocials();

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