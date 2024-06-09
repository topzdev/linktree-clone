import * as React from "react"

import {cn} from "@/lib/utils"
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import {Input, InputProps, inputStyling} from "@/components/ui/input";
import {Controller} from "react-hook-form";

export type TextareaProps =
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
    & { textareaClassName?: string }
    & InputWrapperProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
         label,
         error,
         hint,
         className,
         textareaClassName,
         ...props
     }, ref) => {

        const inputWrapperProps = {id: props.id, error, hint, className, label}

        return (
            <InputWrapper {...inputWrapperProps}>
      <textarea
          className={cn(
              inputStyling({error}),
              'min-h-[118px]',
              textareaClassName
          )}
          ref={ref}
          {...props}
      />
            </InputWrapper>
        )
    }
)

type ControlledProp = {
    control: any;
    name: string;
} & TextareaProps;
export const FormTextarea = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
                <Textarea
                    {...props}
                    {...field}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};


Textarea.displayName = "Textarea"

export {Textarea}
