import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type Props = {
    children?: React.ReactNode
}

const ProfileInfo = (props: Props) => {
    return <div className="'flex flex-col items-center">
        <Avatar>
            <AvatarImagesrc></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
}

export default ProfileInfo;