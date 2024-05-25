import React from "react";
import {Link} from "@/types/models";
import LinkMainCard from "@/app/(public)/[username]/_components/link/LinkMainCard";
import LinkHeaderCard from "@/app/(public)/[username]/_components/link/LinkHeaderCard";

type Props = {
    children?: React.ReactNode,
    links: Link[]
}

const LinkListContainer = ({links}: Props) => {
    return <div className={'flex flex-col gap-y-4 w-full'}>
        {links.map(item => {
            switch (item.type) {
                case 1:
                    return <LinkMainCard key={`link-item-` + item.id} data={item}/>
                case 2:
                    return <LinkHeaderCard key={`link-item-` + item.id} data={item}/>
            }
        })}
    </div>
}

export default LinkListContainer;