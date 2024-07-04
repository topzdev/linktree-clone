"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import FontsForm, {
    FontsFormSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/buttons/FontsForm";
import useFetchFonts from "@/hooks/api/useFetchFonts";

type Props = {
    children?: React.ReactNode;
};

const FontSection = (props: Props) => {
    const { isLoading, data } = useFetchFonts();

    return (
        <div className="flex w-full flex-col gap-y-5" id={"fonts"}>
            <div className={"relative flex flex-col"}>
                <Typography as="h1" variant={"h2"}>
                    Fonts
                </Typography>
            </div>
            {isLoading && <FontsFormSkeleton />}
            {!isLoading && data && <FontsForm value={data} />}
        </div>
    );
};

export default FontSection;
