"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import {Circle} from "lucide-react"

import {cn} from "@/lib/utils"
import {Controller} from "react-hook-form";
import InputWrapper, {
    InputWrapperProps,
    InputWrapperSkeleton,
    InputWrapperSkeletonProps
} from "@/components/ui/input-wrapper";
import {Skeleton} from "@/components/ui/skeleton";

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps & InputWrapperProps & { inputClassName?: string }
>(({label, error, hint, className, inputClassName, ...props}, ref) => {
    const inputWrapperProps = {id: props.id, error, hint, className, label};

    return (
        <InputWrapper {...inputWrapperProps}>
            <RadioGroupPrimitive.Root
                className={cn("grid gap-2", inputClassName)}
                {...props}
                ref={ref}
            />
        </InputWrapper>
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export const RadioGroupSkeleton = ({...props}: InputWrapperSkeletonProps) => {
    return <InputWrapperSkeleton {...props}/>
}

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    showIndicator?: boolean,
    value?: any
}
>(({className, children, showIndicator = true, ...props}, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "aspect-square h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            {showIndicator &&
                <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                    <Circle className="h-3 w-3 fill-current text-current"/>
                </RadioGroupPrimitive.Indicator>
            }
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export const RadioGroupItemSkeleton = () => {
    return <Skeleton className={'h-5 w-5 rounded-full'}></Skeleton>
}

type ControlledProp = {
    control: any;
    name: string;
} & RadioGroupProps;

export const FormRadioGroup = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
                <RadioGroup
                    {...props}
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    error={fieldState.error?.message}
                />
            )}
        />
    )
}

export {RadioGroup, RadioGroupItem}
