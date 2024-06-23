"use client"
import React from "react";
import Typography from "@/components/ui/typography";
import {IconButton} from "@/components/ui/icon-button";
import MaterialSymbolsChevronRightRounded from "@/components/icons/MaterialSymbolsChevronRightRounded";
import {ListItem} from "@/components/ui/list";
import MaterialSymbolsEditOutlineRounded from "@/components/icons/MaterialSymbolsEditOutlineRounded";
import MaterialSymbolsCheckRounded from "@/components/icons/MaterialSymbolsCheckRounded";
import {useRouter} from "next/navigation";
import pageRoutes from "@/configs/page-routes";
import {SocialIcon} from "@/app/dashboard/(main)/settings/_components/SocialListModal";
import {Social} from "../../../../../../types/models";

type Props = {
    children?: React.ReactNode,
    info: SocialIcon,
    added?: Social;
}

const SocialListItem = ({info, added}: Props) => {
    const router = useRouter();

    const gotoPage = () => {
        const {add, edit} = pageRoutes.dashboard.socials;
        router.push(!!added ? edit(added.id).href : add(info.id).href)
    }


    return <ListItem onClick={gotoPage} rightAdornment={added ?
        <IconButton>
            <MaterialSymbolsEditOutlineRounded/>
        </IconButton> :
        <IconButton>
            <MaterialSymbolsChevronRightRounded/>
        </IconButton>
    }>
        <div className="flex items-center w-full gap-x-3">
            {info && info.icon &&
                <div className={'h-7 min-w-7 md:h-7 md:min-w-7 text-foreground-primary'} dangerouslySetInnerHTML={{
                    __html: info.icon
                }}></div>
            }
            <Typography className={'flex items-center gap-x-2'}>
                {info?.title}
                {!!added &&
                    <MaterialSymbolsCheckRounded className={'text-green-500 text-2xl'}/>
                }
            </Typography>
        </div>
    </ListItem>
}

export default SocialListItem;