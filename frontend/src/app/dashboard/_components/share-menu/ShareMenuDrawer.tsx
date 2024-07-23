import { ShareMenuProps } from "@/app/dashboard/_components/ShareMenu";
import ShareMenuContent from "@/app/dashboard/_components/share-menu/ShareMenuContent";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

type Props = ShareMenuProps;
const ShareMenuDrawer = ({ children, ...props }: Props) => {
    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Share To</DrawerTitle>
                </DrawerHeader>
                <div className={"pb-4 px-4"}>
                    <ShareMenuContent {...props} />
                </div>
            </DrawerContent>
        </Drawer>
    );
};
export default ShareMenuDrawer;
