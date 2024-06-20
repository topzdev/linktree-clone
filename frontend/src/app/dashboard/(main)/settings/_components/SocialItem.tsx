import React, {useMemo, useState} from "react";
import {IconButton} from "@/components/ui/icon-button";
import MaterialSymbolsDragIndicator from "@/components/icons/MaterialSymbolsDragIndicator";
import {Social} from "../../../../../../types/models";
import Typography from "@/components/ui/typography";
import socialIcons from "@/data/social-icons";
import {Switch} from "@/components/ui/switch";
import MaterialSymbolsEditOutlineRounded from "@/components/icons/MaterialSymbolsEditOutlineRounded";

type Props = {
    children?: React.ReactNode,
    data: Social,
    updateVisibility: (id: number) => void,
    handle: any
}

const SocialItem = ({data, handle, updateVisibility}: Props) => {
    const [enabled, setEnabled] = useState(data.enabled);

    const handleEnable = async  () => {
        await updateVisibility(data.id);
        setEnabled(state => !state);
    }

    const info = socialIcons.find((item) => item.id === data.social_id);
    return <div className={'flex items-center w-full'}>
        <IconButton {...handle}>
            <MaterialSymbolsDragIndicator/>
        </IconButton>
       <div className="flex items-center w-full gap-x-3">
           {info && info.icon && <div className={'h-7 min-w-7 md:h-7 md:min-w-7'} dangerouslySetInnerHTML={{
               __html: info.icon
           }}></div>
           }
           <Typography>
               {info?.title}
           </Typography>
       </div>

        <div className={'flex items-center ml-auto text-secondary-foreground'}>
            <IconButton>
                <MaterialSymbolsEditOutlineRounded/>
            </IconButton>
            <Switch checked={enabled} onCheckedChange={handleEnable}/>
        </div>

    </div>
}

export default SocialItem;