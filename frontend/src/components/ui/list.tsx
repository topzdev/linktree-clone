import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

type ListProps = {
    children?: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>

const List = React.forwardRef<HTMLUListElement, ListProps>(({className, children, ...props}, ref) => {
    {
        return <ul className={cn('flex flex-col', className)} {...props} ref={ref}>
            {children}
        </ul>
    }
})

List.displayName = 'List';

export type ListItemProps = {
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
} & React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({
                                                                            className,
                                                                            leftAdornment,
                                                                            rightAdornment,
                                                                            children,
                                                                            ...props
                                                                        }, ref) => {
    return <li
        className={cn('flex items-center text-foreground-secondary hover:bg-slate-100 rounded-lg px-2 md:px-3 py-2 md:py-2.5 cursor-pointer select-none', className)} {...props}
        ref={ref}>
        {leftAdornment && <div className={'flex items-center'}>{leftAdornment}</div>}
        {children}
        {rightAdornment && <div className={'flex items-center'}>{rightAdornment}</div>}
    </li>
})

export const ListItemSkeleton = () => {
    return <li className={'flex w-full gap-x-2'}>
        <Skeleton className={'h-[38px] w-[48px] rounded-2xl'}/>
        <Skeleton className={'h-[38px] w-1/3 rounded-2xl'}/>
        <Skeleton className={'h-[38px] w-[48px] rounded-2xl ml-auto'}/>
    </li>
}

ListItem.displayName = 'ListItem';

export default List;