"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import SocialForm, {SocialFormSkeleton} from "@/app/dashboard/(main)/settings/_components/SocialsForm";
import useFetchSocials from "@/hooks/useFetchSocials";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsFontSection = (props: Props) => {
    const {isLoading, data} = useFetchSocials();

    return <div className="flex flex-col gap-y-5 w-full" id={'socials'}>
        <div className={'flex flex-col relative'}>
            <Typography as="h1" variant={'h2'}>
                Fonts
            </Typography>
        </div>
        {/*{isLoading && <SocialFormSkeleton/>}*/}
        {/*{!isLoading && data && <SocialForm value={data}/>}*/}
    </div>

}

export default DashboardSettingsFontSection;
