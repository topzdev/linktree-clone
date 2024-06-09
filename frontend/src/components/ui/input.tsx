import * as React from 'react';

import {cn} from '@/lib/utils';
import {Controller} from 'react-hook-form';
import InputWrapper, {InputWrapperProps, InputWrapperSkeleton} from "@/components/ui/input-wrapper";
import {Skeleton} from "@/components/ui/skeleton";

export const inputStyling = ({error}: Pick<InputProps, 'error'>) => {
    return [
        'flex border border-slate-100 bg-slate-100 w-full rounded-2xl px-5 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'bg-red-100 border-red-500 !ring-red-500'
    ]
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    inputClassName?: string
} & InputWrapperProps

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
         label,
         error,
         hint,
         className,
         inputClassName,
         type,
         ...props
     }, ref) => {

        const inputWrapperProps = {id: props.id, error, hint, className, label}
        return (
            <InputWrapper {...inputWrapperProps}>
                <input
                    type={type}
                    className={cn(
                        inputStyling({error}),
                        'h-[48px] md:h-[52px]',
                        inputClassName
                    )}
                    ref={ref}
                    {...props}
                />
            </InputWrapper>
        );
    }
);

type ControlledProp = {
    control: any;
    name: string;
} & InputProps;
export const FormInput = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
                <Input
                    {...props}
                    {...field}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const InputSkeleton = ({}: InputProps) => {
    return <InputWrapperSkeleton>
        <Skeleton className={'h-[48px] md:h-[52px] rounded-2xl w-full'} />
    </InputWrapperSkeleton>
}

Input.displayName = 'Input';

export {Input};
