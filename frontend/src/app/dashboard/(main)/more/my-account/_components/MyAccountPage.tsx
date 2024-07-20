"use client";

import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import useAppAuth from "@/hooks/useAppAuth";
import MyAccountForm from "@/app/dashboard/(main)/more/my-account/_components/MyAccountForm";
import Typography from "@/components/ui/typography";
import React from "react";

type Props = {};
const MyAccountPage = (props: Props) => {
    const { user } = useAppAuth();

    return (
        <DashboardContainer>
            <div className="flex w-full flex-col gap-y-5">
                <div className={"relative flex flex-col"}>
                    <Typography as="h1" variant={"h2"}>
                        My Account
                    </Typography>
                </div>
                <MyAccountForm value={user} />
            </div>
        </DashboardContainer>
    );
};
export default MyAccountPage;
