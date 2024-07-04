import React from "react";
import { Link } from "../../../../../../types/models";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonsStyle, ButtonStyleTypes } from "@/data/buttons-style";

type Props = {
    children?: React.ReactNode;
    data: Link;
    buttonType: ButtonStyleTypes;
};

const LinkMainCard = ({
    data: { id, type, url, title, thumbnail, thumbnail_url },
    buttonType = "fill",
}: Props) => {
    const buttonConfig = buttonsStyle[buttonType];
    const thumbnailStyle = buttonType.includes("circular")
        ? "rounded-full"
        : "rounded";

    return (
        <a
            style={{ ...buttonConfig.style }}
            href={url || ""}
            target={"_blank"}
            className={cn(
                "flex min-h-[70px] items-center gap-x-4 p-2.5 px-3 md:gap-x-5 md:px-4",
                buttonConfig.className,
            )}
        >
            <div
                className={cn(
                    "relative h-[40px] w-[40px] min-w-[40px] overflow-hidden rounded md:h-[50px] md:w-[50px] md:min-w-[50px]",
                    thumbnailStyle,
                )}
            >
                {thumbnail_url && (
                    <Image
                        src={thumbnail_url}
                        fill={true}
                        alt={title}
                        sizes="(min-width: 808px) 50px"
                        style={{
                            objectFit: "cover", // cover, contain, none
                        }}
                    ></Image>
                )}
            </div>

            <div className={"w-full text-center"}>
                <Typography
                    className="text-base max-md:text-sm"
                    variant={"large"}
                >
                    {title}
                </Typography>
            </div>

            <div className="min-h-[40px] min-w-[40px] md:min-h-[50px] md:min-w-[50px]"></div>
        </a>
    );
};

export default LinkMainCard;
