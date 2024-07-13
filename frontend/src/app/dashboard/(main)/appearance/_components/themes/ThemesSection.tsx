"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import ThemesForm, {
    ThemesFormSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/themes/ThemesForm";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import useFetchThemes from "@/hooks/api/useFetchThemes";

type Props = {
    children?: React.ReactNode;
};

const ThemesSection = (props: Props) => {
    const appearance = useFetchAppearance();
    const themes = useFetchThemes();

    const isLoading = themes.isLoading || appearance.isLoading;

    return (
        <div className="flex w-full flex-col gap-y-5" id={"fonts"}>
            <div className={"relative flex flex-col"}>
                <Typography as="h1" variant={"h2"}>
                    Themes
                </Typography>
            </div>
            {isLoading && <ThemesFormSkeleton />}
            {!isLoading && themes.data && appearance.data && (
                <ThemesForm themes={themes.data} value={appearance.data} />
            )}
        </div>
    );
};

export default ThemesSection;
