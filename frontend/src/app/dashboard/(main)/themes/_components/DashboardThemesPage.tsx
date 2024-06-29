import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import CustomThemeSection from "@/app/dashboard/(main)/themes/_components/CustomThemeSection";
import ThemesSection from "@/app/dashboard/(main)/themes/_components/ThemesSection";

type Props = {
    children?: React.ReactNode
}

const DashboardThemesPage = (props: Props) => {
    return <DashboardContainer className={'flex flex-col gap-y-12'}>
        <ThemesSection/>
        <CustomThemeSection/>
    </DashboardContainer>
}

export default DashboardThemesPage;