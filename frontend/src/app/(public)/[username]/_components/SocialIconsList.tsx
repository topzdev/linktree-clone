import React from "react";
import {Social} from "@/types/models";
import SocialIcon from "@/app/(public)/[username]/_components/socials/SocialIcon";

type Props = {
    children?: React.ReactNode,
    socials: Social[]
}

const SocialIconsList = ({socials}: Props) => {
    return <ul className="flex gap-x-4">
        {socials.map(item => <SocialIcon key={item.id + item.social_id} data={item} />)}
        <li></li>
    </ul>
}

export default SocialIconsList;