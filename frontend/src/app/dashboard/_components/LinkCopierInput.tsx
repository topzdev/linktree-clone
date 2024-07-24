import { Input } from "@/components/ui/input";
import AppLogoIcon from "@/components/common/AppLogoIcon";
import Typography from "@/components/ui/typography";
import React, { useState } from "react";

type Props = {
    link: string;
};
const LinkCopierInput = ({ link }: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 3000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    return (
        <div className={"w-full"} onClick={handleCopy}>
            <Input
                leftAdornment={
                    <div className={"w-14 pointer-events-none"}>
                        <AppLogoIcon className={"h-6 w-6 text-primary"} />
                    </div>
                }
                rightAdornment={
                    <Typography
                        className={"w-14 text-right pointer-events-none"}
                    >
                        {copied ? "Copied" : "Copy"}
                    </Typography>
                }
                readOnly
                inputParentClassName="min-h-[58px] md:min-h-[68px]"
                inputClassName="cursor-pointer text-center"
                className={"text-center cursor-pointer"}
                value={link}
            />
        </div>
    );
};
export default LinkCopierInput;
