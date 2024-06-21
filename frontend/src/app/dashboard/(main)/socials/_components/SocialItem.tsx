import React, {useMemo, useState} from "react";
import {IconButton} from "@/components/ui/icon-button";
import MaterialSymbolsDragIndicator from "@/components/icons/MaterialSymbolsDragIndicator";
import {Social} from "../../../../../../types/models";
import Typography from "@/components/ui/typography";
import socialIcons from "@/data/social-icons";
import {Switch} from "@/components/ui/switch";
import MaterialSymbolsEditOutlineRounded from "@/components/icons/MaterialSymbolsEditOutlineRounded";
import {ListItem, ListItemProps} from "@/components/ui/list";
import pageRoutes from "@/configs/page-routes";
import Link from "next/link";

type Props = {
    children?: React.ReactNode,
    data: Social,
    updateVisibility: (id: number) => void,
    handle: any,
} & ListItemProps;

const SocialItem = React.forwardRef<HTMLLIElement, Props>( ({data, handle, updateVisibility, ...props}, ref) => {
    const [enabled, setEnabled] = useState(data.enabled);

    const handleEnable = async () => {
        await updateVisibility(data.id);
        setEnabled(state => !state);
    }

    const info = socialIcons.find((item) => item.id === data.social_id);
    const editLink = useMemo(() => pageRoutes.dashboard.socials.edit(data.id).href, [data.id])

    return <ListItem {...props}
                     leftAdornment={<IconButton className={'!px-0 !min-w-5'}
                                                {...handle}>
                         <MaterialSymbolsDragIndicator/>
                     </IconButton>}
                     rightAdornment={<div className={'flex items-center ml-auto text-secondary-foreground'}>
                        <Link href={editLink}>
                            <IconButton>
                                <MaterialSymbolsEditOutlineRounded/>
                            </IconButton>
                        </Link>
                         <Switch checked={enabled} onCheckedChange={handleEnable}/>
                     </div>}
                    ref={ref}
    >

        <div className="flex items-center w-full gap-x-3 ml-2">
            {info && info.icon && <div className={'h-7 min-w-7 md:h-7 md:min-w-7 text-foreground-primary'} dangerouslySetInnerHTML={{
                __html: info.icon
            }}></div>
            }
            <Typography>
                {info?.title}
            </Typography>
        </div>
    </ListItem>
})

export default SocialItem;