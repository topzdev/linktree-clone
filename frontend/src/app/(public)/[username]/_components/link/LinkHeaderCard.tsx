import React from "react";
import Typography from "@/components/ui/typography";
import {Link} from "@/types/models";

type Props = {
    children?: React.ReactNode,
    data: Link
}

const LinkHeaderCard = ({data: {title}}: Props) => {
    return <div className="text-center py-4 w-full">
            <Typography variant={'h4'}>{title}</Typography>
    </div>
}

export default LinkHeaderCard;