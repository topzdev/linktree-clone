import React from "react";
import {cn} from "@/lib/utils";
import {buttonsStyle} from "@/data/buttons-style";

type Props = {
    children?: React.ReactNode
}

const buttonsData = [
    {
        "id": 1,
        "created_at": null,
        "updated_at": null,
        "title": "Fill",
        "key": "fill",
        "group_id": 1
    },
    {
        "id": 2,
        "created_at": null,
        "updated_at": null,
        "title": "Fill Rounded",
        "key": "fillrounded",
        "group_id": 1
    },
    {
        "id": 3,
        "created_at": null,
        "updated_at": null,
        "title": "Fill Circular",
        "key": "fillcircular",
        "group_id": 1
    },
    {
        "id": 4,
        "created_at": null,
        "updated_at": null,
        "title": "Outline",
        "key": "outline",
        "group_id": 2
    },
    {
        "id": 5,
        "created_at": null,
        "updated_at": null,
        "title": "Outline Rounded",
        "key": "outlinerounded",
        "group_id": 2
    },
    {
        "id": 6,
        "created_at": null,
        "updated_at": null,
        "title": "Outline Circular",
        "key": "outlinecircular",
        "group_id": 2
    },
    {
        "id": 7,
        "created_at": null,
        "updated_at": null,
        "title": "Soft shadow",
        "key": "softshadow",
        "group_id": 3
    },
    {
        "id": 8,
        "created_at": null,
        "updated_at": null,
        "title": "Soft shadow Rounded",
        "key": "softshadowrounded",
        "group_id": 3
    },
    {
        "id": 9,
        "created_at": null,
        "updated_at": null,
        "title": "Soft shadow Circular",
        "key": "softshadowcircular",
        "group_id": 3
    },
    {
        "id": 10,
        "created_at": null,
        "updated_at": null,
        "title": "Hardshadow",
        "key": "hardshadow",
        "group_id": 4
    },
    {
        "id": 11,
        "created_at": null,
        "updated_at": null,
        "title": "Hard shadow Rounded",
        "key": "hardshadowrounded",
        "group_id": 4
    },
    {
        "id": 12,
        "created_at": null,
        "updated_at": null,
        "title": "Hard shadow Circular",
        "key": "hardshadowcircular",
        "group_id": 4
    }
]
const Page = (props: Props) => {
    return <div className={'flex flex-col gap-6 py-10'}>
        {buttonsData.map(item => <div className={cn('w-full p-2.5 text-center', buttonsStyle[item.key] ? buttonsStyle[item.key] : '')}>
            {item.title}
        </div> )}
    </div>
}

export default Page;