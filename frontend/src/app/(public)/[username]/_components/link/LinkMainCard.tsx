import React from "react";
import {Link} from "@/types/models";
import Typography from "@/components/ui/typography";
import Image from "next/image";

type Props = {
    children?: React.ReactNode,
    data: Link,
}

const LinkMainCard = ({data: {id, type, url, title, thumbnail, thumbnail_url}}: Props) => {
    return <a href={url || ''} target={'_blank'} className="flex bg-white rounded-md p-2.5 gap-x-5 items-center min-h-[70px]">
        <div className="w-[50px] h-[50px] min-w-[50px] rounded overflow-hidden relative">
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