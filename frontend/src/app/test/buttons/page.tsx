import React from "react";
import {cn} from "@/lib/utils";
import {buttonsStyle} from "@/data/buttons-style";
import profileCssVariables from "@/lib/profileCssVariables";


type Props = {
    children?: React.ReactNode
}

const buttonsData = [
    {
        "id": 1,
        "title": "Fill",
        "key": "fill",
        "group_id": 1
    },
    {
        "id": 2,
        "title": "Fill Rounded",
        "key": "fillrounded",
        "group_id": 1
    },
    {
        "id": 3,
        "title": "Fill Circular",
        "key": "fillcircular",
        "group_id": 1
    },
    {
        "id": 4,
        "title": "Outline",
        "key": "outline",
        "group_id": 2
    },
    {
        "id": 5,
        "title": "Outline Rounded",
        "key": "outlinerounded",
        "group_id": 2
    },
    {
        "id": 6,
        "title": "Outline Circular",
        "key": "outlinecircular",
        "group_id": 2
    },
    {
        "id": 7,
        "title": "Soft shadow",
        "key": "softshadow",
        "group_id": 3
    },
    {
        "id": 8,
        "title": "Soft shadow Rounded",
        "key": "softshadowrounded",
        "group_id": 3
    },
    {
        "id": 9,
        "title": "Soft shadow Circular",
        "key": "softshadowcircular",
        "group_id": 3
    },
    {
        "id": 10,
        "title": "Hardshadow",
        "key": "hardshadow",
        "group_id": 4
    },
    {
        "id": 11,
        "title": "Hard shadow Rounded",
        "key": "hardshadowrounded",
        "group_id": 4
    },
    {
        "id": 12,
        "title": "Hard shadow Circular",
        "key": "hardshadowcircular",
        "group_id": 4
    }
]
const Page = (props: Props) => {
    return <div
        style={profileCssVariables({
            btn_shadow_color: 'red',
            btn_text_color: '#000',
            btn_color: 'yellow'
        })}
        className={'flex flex-col gap-6 py-10 px-10'}>

        {buttonsData.map(item =>
            <div style={{
                ...buttonsStyle[item.key].style
            }}
                 className={cn('w-full p-2.5 text-center', buttonsStyle[item.key] ? buttonsStyle[item.key].className : '')}>
                {item.title}
            </div>)}
    </div>
}

export default Page;