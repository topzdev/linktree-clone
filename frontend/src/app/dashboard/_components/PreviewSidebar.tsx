import React from "react";
import {cn} from "@/lib/utils";

type Props = {
    children?: React.ReactNode,
    className?: string,
}

const PreviewSidebar = ({className}: Props) => {
    return <aside className={cn("bg-background", className)}>
        Preview Sidebar Here
    </aside>
}

export default PreviewSidebar;
