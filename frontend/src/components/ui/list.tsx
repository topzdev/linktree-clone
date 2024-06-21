import React from "react";
import {cn} from "@/lib/utils";

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
        className={cn('flex items-center text-foreground-secondary hover:bg-slate-100 rounded-lg px-3 py-2.5 cursor-pointer select-none', className)} {...props}
        ref={ref}>
        {leftAdornment && <div className={'flex items-center'}>{leftAdornment}</div>}
        {children}
        {rightAdornment && <div className={'flex items-center'}>{rightAdornment}</div>}
    </li>
})

ListItem.displayName = 'ListItem';

export default List;