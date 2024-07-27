import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ShareMenuProps } from "@/app/dashboard/_components/ShareMenu";
import ShareMenuContent from "@/app/dashboard/_components/share-menu/ShareMenuContent";
import React from "react";

type Props = ShareMenuProps;
const ShareMenuModal = ({ children, ...props }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px] !pb-0">
                <DialogHeader>
                    <DialogHeader>
                        <DialogTitle>Share to</DialogTitle>
                    </DialogHeader>
                    <ShareMenuContent {...props} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default ShareMenuModal;
