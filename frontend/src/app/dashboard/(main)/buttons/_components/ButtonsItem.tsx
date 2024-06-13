import React from "react";
import {buttonsStyle, ButtonStyleTypes} from "@/data/buttons-style";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
    children?: React.ReactNode,
    buttonType: string,
    active?: boolean
} &  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ButtonsItem = ({buttonType, active, ...props}: Props) => {
    // @ts-ignore;
    const buttonConfig = buttonsStyle[buttonType];

    return <div {...props} className={cn('flex items-center justify-center col-span-4 rounded-2xl min-h-[100px] px-2.5 bg-slate-100 border-[4px] border-slate-100 cursor-pointer', active ? 'border-primary' : '')}>
        <div style={{...buttonConfig.style}} className={cn('flex w-full min-h-[50px]', buttonConfig.className)}>

        </div>
    </div>
}

export const ButtonsItemSkeleton = () => {
    return <Skeleton className={'col-span-4 rounded-2xl min-h-[100px]'}>
    </Skeleton>
}

export default ButtonsItem;