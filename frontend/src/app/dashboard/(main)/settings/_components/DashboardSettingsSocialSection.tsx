"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import SocialForm, {SocialFormSkeleton} from "@/app/dashboard/(main)/settings/_components/SocialsForm";
import useFetchSocials from "@/hooks/api/useFetchSocials";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsSocialSection = (props: Props) => {
    const {isLoading, data} = useFetchSocials();

    return <div className="flex flex-col gap-y-5 w-full" id={'socials'}>
        <div className={'flex flex-col relative'}>
            <Typography as="h1" variant={'h2'}>
                Social Icons
            </Typography>
        </div>

        {isLoading && <SocialFormSkeleton/>}
        {!isLoading && data && <SocialForm value={data}/>}
    </div>

}

export default DashboardSettingsSocialSection;
