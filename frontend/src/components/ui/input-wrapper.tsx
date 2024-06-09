import React from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import Typography from "@/components/ui/typography";

export type InputWrapperProps = {
    children?: React.ReactNode,
    className?: string,
    error?: string | boolean;
    hint?: string,
    label?: string,
    id?: string,
}

const InputWrapper = ({className, error, hint, label, children, id}: InputWrapperProps) => {
    return <div className={cn('flex flex-col gap-y-1', className)}>
        {label && <Label htmlFor={id}>{label}</Label>}

        {children}

        {error && (
            <Typography
                variant='detail'
                className='text-red-500'
            >
                {error}
            </Typography>
        )}
        {!error && hint && (
            <Typography
                variant='detail'
                foreground='secondary'
            >
                {hint}
            </Typography>
        )}
    </div>
}

export default InputWrapper;