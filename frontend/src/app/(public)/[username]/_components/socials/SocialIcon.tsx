import React, {useMemo} from "react";
import Link from "next/link";
import {Social} from "../../../../../../types/models";
import socialIcons from "@/data/social-icons";

type Props = {
    children?: React.ReactNode
    data: Social
}

const SocialIcon = ({data: {social_id, id, position, user_id, value, updated_at, created_at,}}: Props) => {
    // @ts-ignore
    const info = socialIcons.find((item) => item.id === social_id);

    if (!info) return;

    return <Link className={'flex'} href={value} target={'_blank'} title={info.title}>
        {info.icon && <div className={'h-8 w-8 md:h-10 md:w-10'} dangerouslySetInnerHTML={{
            __html: info.icon
        }}></div>
        }

    </Link>
}

export default SocialIcon;