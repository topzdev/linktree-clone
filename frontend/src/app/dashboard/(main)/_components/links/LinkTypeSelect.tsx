import React from "react";
import {SelectContentProps} from "@radix-ui/react-select";
import MaterialSymbolsLinkRounded from "@/components/icons/MaterialSymbolsLinkRounded";
import MaterialSymbolsFormatH1Rounded from "@/components/icons/MaterialSymbolsFormatH1Rounded";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DropdownMenuContentProps, DropdownMenuProps} from "@radix-ui/react-dropdown-menu";

type Props = {
    children?: React.ReactNode,
    value: string,
    onValueChange: (value: string) => void;
    contentProps?: DropdownMenuContentProps
} & DropdownMenuProps;

const menuItem = [
    {
        icon: <MaterialSymbolsLinkRounded className="text-xl"/>,
        title: 'Link',
        value: '1',
        shortcut: '⌘L'
    },
    {
        icon: <MaterialSymbolsFormatH1Rounded className={'text-xl'}/>,
        title: 'Heading',
        value: '2',
        shortcut: '⌘H'
    }
]

const LinkTypeSelect = ({children, value, onValueChange, contentProps, ...props}: Props) => {
    return <DropdownMenu {...props}>
        <DropdownMenuTrigger>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent {...contentProps}>
            {
                menuItem.map(item =>
                    <DropdownMenuItem onClick={() => onValueChange(item.value)}>
                        {item.icon}
                        <span className={'ml-2'}>{item.title}</span>
                        <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

export default LinkTypeSelect;