"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import CustomThemeForm, {
    CustomThemeSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/custom/CustomThemeForm";
import useFetchTheme from "@/hooks/api/useFetchTheme";

type Props = {
    children?: React.ReactNode;
};

const CustomThemeSection = (props: Props) => {
    const { isLoading, data } = useFetchTheme();

    return (
        <div className="flex w-full flex-col gap-y-5" id={"fonts"}>
            <div className={"relative flex flex-col"}>
                <Typography as="h1" variant={"h2"}>
                    Custom Theme
                </Typography>
                <Typography
                    className={"mt-2"}
                    foreground="secondary"
                    as="p"
                    variant={"body"}
                >
                    Completely customize your Linktree profile. Change your
                    background with colors, gradients and images. Choose a
                    button style, change the typeface and more.
                </Typography>
            </div>
            {isLoading && <CustomThemeSkeleton />}
            {!isLoading && data && <CustomThemeForm value={data} />}
        </div>
    );
};

export default CustomThemeSection;
