import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import { Controller } from 'react-hook-form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string | boolean;
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, inputClassName, type, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-y-1', className)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            'flex border border-slate-100 bg-slate-100 w-full rounded-2xl h-[52px] px-5 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'bg-red-100 border-red-500 !ring-red-500',
            inputClassName
          )}
          ref={ref}
          {...props}
        />
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
    );
  }
);

type ControlledProp = {
  control: any;
  name: string;
} & InputProps;
export const FormInput = ({ name, control, ...props }: ControlledProp) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => (
        <Input
          {...props}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

Input.displayName = 'Input';

export { Input };
