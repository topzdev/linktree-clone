import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import ThemesSection from "@/app/dashboard/(main)/appearance/_components/themes/ThemesSection";

type Props = {
    children?: React.ReactNode;
};

const DashboardThemesPage = (props: Props) => {
    return (
        <DashboardContainer className={"flex flex-col gap-y-12"}>
            <ThemesSection />
        </DashboardContainer>
    );
};

export default DashboardThemesPage;
