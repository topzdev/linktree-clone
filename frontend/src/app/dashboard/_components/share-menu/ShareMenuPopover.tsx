import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import ShareMenuContent from "@/app/dashboard/_components/share-menu/ShareMenuContent";
import React from "react";
import { ShareMenuProps } from "@/app/dashboard/_components/ShareMenu";

type Props = ShareMenuProps;
const ShareMenuPopover = ({ children, ...props }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align={"end"} sideOffset={10} className="w-[450px]">
                <Dialog defaultOpen={true} modal={false}>
                    <DialogHeader className={"pb-4"}>
                        <DialogTitle>Share to</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <ShareMenuContent {...props} />
                    </DialogBody>
                </Dialog>
            </PopoverContent>
        </Popover>
    );
};
export default ShareMenuPopover;
