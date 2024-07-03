import React from "react";
import {Social} from "../../../../../types/models";
import SocialIcon from "@/app/(public)/[username]/_components/socials/SocialIcon";

type Props = {
    children?: React.ReactNode,
    socials: Social[]
}

const SocialIconsList = ({socials}: Props) => {
    return <ul className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 w-full">
        {socials.map(item => <SocialIcon key={item.id + item.social_id} data={item}/>)}
        <li></li>
    </ul>
}

export default SocialIconsList;