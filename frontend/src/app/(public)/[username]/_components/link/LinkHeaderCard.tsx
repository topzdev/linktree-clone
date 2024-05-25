import React from "react";
import Typography from "@/components/ui/typography";
import {Link} from "@/types/models";

type Props = {
    children?: React.ReactNode,
    data: Link
}

const LinkHeaderCard = ({data: {title}}: Props) => {
    return <div className="text-center w-full">
            <Typography variant={'h3'}>{title}</Typography>
    </div>
}

export default LinkHeaderCard;