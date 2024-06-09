import React from "react";
import {buttonsStyle, ButtonStyleTypes} from "@/data/buttons-style";
import {cn} from "@/lib/utils";

type Props = {
    children?: React.ReactNode,
    buttonType: string,
}

const ButtonsItem = ({buttonType}: Props) => {
    const buttonConfig = buttonsStyle[buttonType];

    return <div className={'flex items-center justify-center col-span-4 rounded-2xl min-h-[100px] px-2.5 bg-slate-100'}>
        <div style={{...buttonConfig.style}} className={cn('flex w-full min-h-[50px]', buttonConfig.className)}>

        </div>
    </div>
}

export default ButtonsItem;