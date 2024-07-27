import { Button, ButtonProps, ButtonSkeleton } from "@/components/ui/button";
import React from "react";
import MaterialSymbolsShareOutline from "@/components/icons/MaterialSymbolsShareOutline";
import { TypographySkeleton } from "@/components/ui/typography";
import { ShareMenuContentProps } from "@/app/dashboard/_components/share-menu/ShareMenuContent";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import dynamic from "next/dynamic";

const ShareMenuModal = dynamic(
    () => import("@/app/dashboard/_components/share-menu/ShareMenuModal"),
    { ssr: false },
);

const ShareMenuPopover = dynamic(
    () => import("@/app/dashboard/_components/share-menu/ShareMenuPopover"),
    { ssr: false },
);

const ShareMenuDrawer = dynamic(
    () => import("@/app/dashboard/_components/share-menu/ShareMenuDrawer"),
    { ssr: false },
);

export type ShareMenuProps = {
    children?: React.ReactNode;
    modal?: boolean;
} & ShareMenuContentProps;

const ShareMenu = ({ modal, ...props }: ShareMenuProps) => {
    const { isMd } = useBreakpoint("md");

    return isMd ? (
        modal ? (
            <ShareMenuModal {...props} />
        ) : (
            <ShareMenuPopover {...props} />
        )
    ) : (
        <ShareMenuDrawer {...props} />
    );
};

export const ShareMenuButton = React.forwardRef(
    (props: ButtonProps, forwardedRef: React.Ref<HTMLButtonElement>) => (
        <Button
            ref={forwardedRef}
            {...props}
            iconLeft={<MaterialSymbolsShareOutline />}
        >
            Share
        </Button>
    ),
);

export const ShareMenuButtonSkeleton = ({ ...props }: ButtonProps) => {
    return (
        <ButtonSkeleton {...props}>
            <TypographySkeleton>Share....</TypographySkeleton>
        </ButtonSkeleton>
    );
};

export default ShareMenu;
