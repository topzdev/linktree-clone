"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import useFetchTheme from "@/hooks/api/useFetchTheme";
import ThemesForm, {ThemesFormSkeleton} from "@/app/dashboard/(main)/themes/_components/ThemesForm";

type Props = {
    children?: React.ReactNode
}

const ThemesSection = (props: Props) => {
    const {isLoading, data} = useFetchTheme();

    return <div className="flex flex-col gap-y-5 w-full" id={'fonts'}>
        <div className={'flex flex-col relative'}>
            <Typography as="h1" variant={'h2'}>
                Themes
            </Typography>
        </div>
        {isLoading && <ThemesFormSkeleton/>}
        {!isLoading && data && <ThemesForm value={data}/>}
    </div>
}

export default ThemesSection;