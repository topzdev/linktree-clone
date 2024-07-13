"use client";

import React from "react";
import Typography from "@/components/ui/typography";
import ButtonsForm, {
    ButtonsFormSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/buttons/ButtonsForm";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";

type Props = {
    children?: React.ReactNode;
};

const ButtonSection = (props: Props) => {
    const { isLoading, data } = useFetchAppearance();

    return (
        <div className="flex w-full flex-col gap-y-5">
            <div className={"relative flex flex-col"}>
                <Typography as="h1" variant={"h2"}>
                    Buttons
                </Typography>
            </div>

            {isLoading && <ButtonsFormSkeleton />}
            {!isLoading && data && <ButtonsForm value={data} />}
        </div>
    );
};

export default ButtonSection;
