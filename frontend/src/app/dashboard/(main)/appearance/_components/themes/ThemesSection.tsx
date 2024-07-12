"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import useFetchTheme from "@/hooks/api/useFetchTheme";
import ThemesForm, {
    ThemesFormSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/themes/ThemesForm";

type Props = {
    children?: React.ReactNode;
};

const ThemesSection = (props: Props) => {
    const { isLoading, data } = useFetchTheme();

    return (
        <div className="flex w-full flex-col gap-y-5" id={"fonts"}>
            <div className={"relative flex flex-col"}>
                <Typography as="h1" variant={"h2"}>
                    Themes
                </Typography>
            </div>
            {isLoading && <ThemesFormSkeleton />}
            {!isLoading && data && <ThemesForm value={data} />}
        </div>
    );
};

export default ThemesSection;
