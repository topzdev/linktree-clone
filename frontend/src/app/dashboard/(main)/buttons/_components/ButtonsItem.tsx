import React from "react";
import {buttonsStyle, ButtonStyleTypes} from "@/data/buttons-style";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";

type Props = {
    children?: React.ReactNode,
    buttonType: string,
    active?: boolean
} &  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ButtonsItem = ({buttonType, active, ...props}: Props) => {
    // @ts-ignore;
    const buttonConfig = buttonsStyle[buttonType];

    return <div {...props} className={cn('flex items-center justify-center col-span-4 rounded-2xl  min-h-[70px] md:min-h-[100px] px-2 md:px-2.5 bg-slate-100 border-[3px] md:border-[4px] border-slate-100 cursor-pointer', active ? 'border-primary' : '')}>
        <div style={{...buttonConfig.style}} className={cn('flex items-center justify-center w-full min-h-[40px] md:min-h-[50px]', buttonConfig.className)}>
            <Typography className={'leading-none my-0 text-xs md:text-sm'}>Text</Typography>
        </div>
    </div>
}

export const ButtonsItemSkeleton = () => {
    return <Skeleton className={'col-span-4 rounded-2xl min-h-[60px] md:min-h-[100px]'}>
    </Skeleton>
}

export default ButtonsItem;