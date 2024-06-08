"use client"
import React, {useCallback, useMemo} from "react";
import {Button} from "@/components/ui/button";
import MaterialSymbolsVisibilityOutline from "@/components/icons/MaterialSymbolsVisibilityOutline";
import {mobileNavbarHeight} from "@/app/dashboard/_components/MobileNavigationBottomBar";
import {usePathname, useRouter} from "next/navigation";
import pageRoutes from "@/configs/page-routes";
import MaterialSymbolsCloseRounded from "@/components/icons/MaterialSymbolsCloseRounded";

type Props = {
    children?: React.ReactNode
}

const PreviewButton = (props: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const isInPreviewPage = useMemo(() => pathname === pageRoutes.dashboard.preview.href, [pathname])

    const handlePreview = useCallback(() => {
        router.push(pageRoutes.dashboard.preview.href);
    }, []);

    const handleClose = useCallback(() => {
        router.back();
    }, []);

    return <div style={{
        bottom: (isInPreviewPage ? 0 : mobileNavbarHeight) + 20 + 'px'
    }} className={"fixed left-1/2 -translate-x-1/2 transition-all lg:hidden"}>
        {!isInPreviewPage ?
            <Button rounded size={'xl'} className={'shadow'} style={{}} color='primary' variant={'tonal'}
                    iconLeft={<MaterialSymbolsVisibilityOutline/>}
                    onClick={handlePreview}>Preview</Button>
            :
            <Button rounded size={'xl'} className={'shadow'} style={{}} color='primary' variant={'tonal'}
                    iconLeft={<MaterialSymbolsCloseRounded/>}
                    onClick={handleClose}
            >Close</Button>
        }
    </div>
}

export default PreviewButton;