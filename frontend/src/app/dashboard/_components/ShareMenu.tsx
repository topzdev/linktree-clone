import { Button, ButtonProps, ButtonSkeleton } from "@/components/ui/button";
import React from "react";
import MaterialSymbolsShareOutline from "@/components/icons/MaterialSymbolsShareOutline";
import { TypographySkeleton } from "@/components/ui/typography";
import { ShareMenuContentProps } from "@/app/dashboard/_components/share-menu/ShareMenuContent";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import dynamic from "next/dynamic";

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
} & ShareMenuContentProps;

const ShareMenu = (props: ShareMenuProps) => {
    const { isMd } = useBreakpoint("md");

    return isMd ? (
        <ShareMenuPopover {...props} />
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
