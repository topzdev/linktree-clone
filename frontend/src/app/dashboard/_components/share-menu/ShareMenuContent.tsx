import List, { ListItem } from "@/components/ui/list";
import { IconButton } from "@/components/ui/icon-button";
import MaterialSymbolsChevronRightRounded from "@/components/icons/MaterialSymbolsChevronRightRounded";
import Image from "next/image";
import LinkCopierInput from "@/app/dashboard/_components/LinkCopierInput";
import React from "react";
import { APP_SHORT_LINK } from "@/configs/app-config";

const shareTo = [
    {
        id: "snapchat",
        icon: "/socials/snapchat.png",
        title: "Snapchat",
    },
    {
        id: "facebook",
        icon: "/socials/facebook.png",
        title: "Facebook",
    },
    {
        id: "linkedin",
        icon: "/socials/linkedin.png",
        title: "LinkedIn",
    },
    {
        id: "x",
        icon: "/socials/x-twitter.png",
        title: "X",
    },
    {
        id: "whatsapp",
        icon: "/socials/whatsapp.png",
        title: "Whatsapp",
    },
    {
        id: "messenger-pc",
        icon: "/socials/messenger.png",
        title: "Messenger",
    },
    {
        id: "email",
        icon: "/socials/email.png",
        title: "Email",
    },
];

export type ShareMenuContentProps = {
    username: string;
    description: string;
    className?: string;
};

const ShareMenuContent = ({ username, description }: ShareMenuContentProps) => {
    const link = `${APP_SHORT_LINK}/${username}`;

    const shareLink = (platform: string) => {
        const encodedURL = encodeURIComponent(link);
        const encodedText = encodeURIComponent(description);
        let shareURL = "";
        let target = "_blank";

        switch (platform) {
            case "facebook":
                shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
                break;
            case "linkedin":
                shareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedText}`;
                break;
            case "messenger":
                shareURL = `fb-messenger://share?link=${encodedURL}`;
                break;
            case "snapchat":
                shareURL = `https://www.snapchat.com/scan?attachmentUrl=${encodedURL}`;
                break;
            case "whatsapp":
                shareURL = `https://wa.me/?text=${encodedText}%20${encodedURL}`;
                break;
            case "twitter":
                shareURL = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`;
                break;
            case "email":
                target = "_self";
                shareURL = `mailto:?subject=${encodedText}&body=${encodedURL}`;
                break;
            default:
                console.error("Unsupported platform");
                return;
        }

        window.open(shareURL, target);
    };

    return (
        <>
            <List className="gap-y-1 mb-5">
                {shareTo.map((item) => (
                    <ListItem
                        onClick={() => shareLink(item.id)}
                        className={"gap-x-5 !pr-0"}
                        key={item.id}
                        rightAdornment={
                            <IconButton size="lg">
                                <MaterialSymbolsChevronRightRounded />
                            </IconButton>
                        }
                    >
                        <Image
                            className="overflow-hidden rounded-lg"
                            src={item.icon}
                            alt={item.title}
                            height={50}
                            width={50}
                        />
                        {item.title}
                    </ListItem>
                ))}
            </List>
            <LinkCopierInput link={link} />
        </>
    );
};
export default ShareMenuContent;
