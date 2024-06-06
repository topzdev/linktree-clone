import React, {useMemo} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger} from "@/components/ui/select";
import {SelectContentProps, SelectProps} from "@radix-ui/react-select";

type Props = {
    children?: React.ReactNode,
    align?: SelectContentProps['align']
} & SelectProps;

const LinkTypeSelect = ({children, align = 'end', ...props}: Props) => {
    return <Select {...props}>
        <SelectTrigger className="w-auto border-0 px-0 py-0 !outline-0 !bg-transparent flex items-center h-full !ring-0"
                       triggerIcon={<></>}>
            {children}
        </SelectTrigger>
        <SelectContent align={align}>
            <SelectGroup className={'text-lg'}>
                <SelectItem value="1">Link</SelectItem>
                <SelectItem value="2">Header</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
}

export default LinkTypeSelect;