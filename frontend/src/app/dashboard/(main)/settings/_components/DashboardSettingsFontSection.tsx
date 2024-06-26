"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import FontsForm, {FontsFormSkeleton} from "@/app/dashboard/(main)/settings/_components/FontsForm";
import useFetchFonts from "@/hooks/api/useFetchFonts";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsFontSection = (props: Props) => {
    const {isLoading, data} = useFetchFonts();

    return <div className="flex flex-col gap-y-5 w-full" id={'fonts'}>
        <div className={'flex flex-col relative'}>
            <Typography as="h1" variant={'h2'}>
                Fonts
            </Typography>
        </div>
        {isLoading && <FontsFormSkeleton/>}
        {!isLoading && data && <FontsForm value={data}/>}
    </div>
}

export default DashboardSettingsFontSection;
