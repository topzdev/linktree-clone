"use client"

import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import DashboardSettingsSocialSection from "@/app/dashboard/(main)/settings/_components/DashboardSettingsSocialSection";
import DashboardSettingsFontSection from "@/app/dashboard/(main)/settings/_components/DashboardSettingsFontSection";

type Props = {
    children?: React.ReactNode
}

const DashboardSettingsPage = (props: Props) => {

    return <DashboardContainer className={'gap-y-6'}>
        <DashboardSettingsSocialSection/>
        {/*<DashboardSettingsFontSection/>*/}
    </DashboardContainer>
}

export default DashboardSettingsPage;