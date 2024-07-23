import React from "react";
import { cn } from "@/lib/utils";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

const AppLogoIcon = ({ className = "w-full", ...props }: Props) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 25"
        >
            <path
                d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24.0019H10.038V16.16Z"
                fill="currentColor"
            ></path>
        </svg>
    );
};

export default AppLogoIcon;
