"use client";

import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import DashboardSettingsSocialSection from "@/app/dashboard/(main)/settings/_components/DashboardSettingsSocialSection";

type Props = {
    children?: React.ReactNode;
};

const DashboardSettingsPage = (props: Props) => {
    return (
        <DashboardContainer className={"flex flex-col gap-y-12"}>
            <DashboardSettingsSocialSection />
        </DashboardContainer>
    );
};

export default DashboardSettingsPage;
