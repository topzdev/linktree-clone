import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import CustomThemeSection from "@/app/dashboard/(main)/themes/_components/CustomThemeSection";

type Props = {
    children?: React.ReactNode
}

const DashboardThemesPage = (props: Props) => {
    return <DashboardContainer className={'flex flex-col gap-y-12'}>
        <CustomThemeSection/>
    </DashboardContainer>
}

export default DashboardThemesPage;