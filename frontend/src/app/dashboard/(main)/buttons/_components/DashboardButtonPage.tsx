"use client"

import React from "react";
import Typography from "@/components/ui/typography";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import ButtonsForm, {ButtonsFormSkeleton} from "@/app/dashboard/(main)/buttons/_components/ButtonsForm";
import profileCssVariables from "@/lib/profileCssVariables";
import {useQuery} from "@tanstack/react-query";
import buttonsServices from "@/services/buttons";

type Props = {
    children?: React.ReactNode
}

const DashboardButtonPage = (props: Props) => {

    const {data, isLoading} = useQuery({
        queryKey: ['buttons'],
        queryFn: () => buttonsServices.getOne(),
    })

    return <DashboardContainer style={{
        ...profileCssVariables(({
            btn_color: '#000',
            btn_text_color: '#fff',
            btn_shadow_color: '#000'
        }))
    }}>
        <div className="flex flex-col gap-y-5 w-full">
            <div className={'flex flex-col relative'}>
                <Typography as="h1" variant={'h2'}>
                    Buttons
                </Typography>
            </div>

            {isLoading && <ButtonsFormSkeleton/>}
            {!isLoading && data && <ButtonsForm value={data}/>}
        </div>
    </DashboardContainer>
}

export default DashboardButtonPage;