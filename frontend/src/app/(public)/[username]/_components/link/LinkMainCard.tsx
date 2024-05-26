import React from "react";
import {Link} from "@/types/models";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import {cn} from "@/lib/utils";
import  {buttonsStyle,ButtonStyleTypes} from "@/data/buttons-style";

type Props = {
    children?: React.ReactNode,
    data: Link,
    buttonType: ButtonStyleTypes,
}

const LinkMainCard = ({data: {id, type, url, title, thumbnail, thumbnail_url}, buttonType = 'fill'}: Props) => {
    const buttonConfig = buttonsStyle[buttonType];
    const thumbnailStyle = buttonType.includes('circular') ? 'rounded-full' : 'rounded';

    return <a style={{...buttonConfig.style}} href={url || ''} target={'_blank'}
              className={cn("flex p-2.5 gap-x-5 items-center min-h-[70px]", buttonConfig.className)}>
        <div className={cn("w-[50px] h-[50px] min-w-[50px] rounded overflow-hidden relative", thumbnailStyle)}>
            {thumbnail_url && <Image src={thumbnail_url} fill={true} alt={title}
                                     sizes="(min-width: 808px) 50px"
                                     style={{
                                         objectFit: 'cover', // cover, contain, none
                                     }}>
            </Image>}
        </div>

        <div className={'text-center w-full'}>
            <Typography variant={'large'}>{title}</Typography>
        </div>

        <div className="min-w-[40px] min-h-[40px]">

        </div>
    </a>
}

export default LinkMainCard;