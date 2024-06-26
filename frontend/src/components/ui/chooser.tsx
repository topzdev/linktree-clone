import React from "react";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import {RadioGroup, RadioGroupItem, RadioGroupProps} from "@/components/ui/radio-group";
import {RadioGroupItemProps} from "@radix-ui/react-radio-group";
import {cn} from "@/lib/utils";
import Typography from "@/components/ui/typography";

type ChooserItem = {
    title: string,
    image: string,
    value: string,
}

export type ChooserProps = {
    children?: React.ReactNode,
} & InputWrapperProps & RadioGroupProps;

const Chooser = ({children, className, error, hint, label, id, ...props}: ChooserProps) => {
    const inputWrapperProps = {error, hint, label, id};
    return <InputWrapper {...inputWrapperProps}>
        <RadioGroup   {...props} className={cn('flex flex-row gap-x-4', className)}>
            {children}
        </RadioGroup>
    </InputWrapper>
}

export type ChooserItemProps = {
    value: string | number,
    title?: string,
    children?: React.ReactNode,
    contentClassName?: string,
} & Omit<RadioGroupItemProps, 'value'>
export const ChooserItem = ({children, value, title, className, contentClassName, ...props}: ChooserItemProps) => {
    return <RadioGroupItem key={value}
                           showIndicator={false}
                           value={value as any}
                           id={value.toString()}
                           {...props}
                           className={cn("flex items-center flex-col text-inherit border-0 min-w-[100px] h-auto gap-y-2 data-[state=checked]:text-primary group w-full bg-transparent", className)}
    >
        <div
            className={cn('h-full w-full rounded-2xl border-transparent border-[3px]  bg-origin-border overflow-hidden relative group-data-[state=checked]:border-primary', contentClassName)}>
            {children}
        </div>

        {title &&
            <Typography className={'leading-none'} variant={'small'}>{title}</Typography>}
    </RadioGroupItem>
};


export default Chooser;
