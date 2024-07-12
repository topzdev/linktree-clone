"use client";

import React, { useEffect } from "react";
import Typography from "@/components/ui/typography";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import ProfileForm, {
    ProfileFormSkeleton,
} from "@/app/dashboard/(main)/profile/_components/ProfileForm";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";

type Props = {
    children?: React.ReactNode;
};

const DashboardProfilePage = (props: Props) => {
    const { isMd } = useBreakpoint("md");

    const { data, isLoading } = useFetchAppearance();

    useEffect(() => {
        console.log("Data Updated..", data);
    }, [data]);

    return (
        <DashboardContainer>
            <div className="flex w-full flex-col gap-y-5">
                <div className={"relative flex flex-col"}>
                    <Typography as="h1" variant={"h2"}>
                        Profile
                    </Typography>
                </div>
                {isLoading && <ProfileFormSkeleton />}
                {!isLoading && data && <ProfileForm value={data} />}
            </div>
        </DashboardContainer>
    );
};

export default DashboardProfilePage;
