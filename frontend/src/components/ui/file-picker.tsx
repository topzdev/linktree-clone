import React, {useEffect, useRef, useState} from "react";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import {Input, InputProps} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Controller} from "react-hook-form";
import MaterialSymbolsFileOpenRounded from "@/components/icons/MaterialSymbolsFileOpenRounded";

type Props = {
    children?: React.ReactNode,
    value: File | File[] | string | null,
    onChange?: (value: any) => void;
} & InputWrapperProps & Pick<InputProps, 'placeholder'> & Pick<HTMLInputElement, 'accept' | 'multiple' | 'defaultValue'>
const FilePicker = ({
                        label,
                        error,
                        hint,
                        value,
                        className,
                        accept,
                        multiple,
                        onChange,
                        defaultValue,
                        placeholder = 'No file chosen',
                        ...props
                    }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (typeof defaultValue === "string") {
            setFileName(defaultValue.substring(defaultValue.lastIndexOf('/') + 1));
        }
    }, [defaultValue]);

    const handleOpenFileExplorer = () => {
        inputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files && event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
        if (onChange) onChange(file);
        if (inputRef.current) inputRef.current.value = '';
    };

    return <InputWrapper {...{label, error, hint}} className={cn(className)}>
        <div className="flex flex-row items-center gap-x-2.5 ">
            <Input value={fileName} placeholder={placeholder} className={'w-full pointer-events-none select-none'}/>
            <Button size={'lg'} onClick={handleOpenFileExplorer}>
                <span class={'hidden lg:block'}>Choose File</span>
                <span class={'flex items-center lg:hidden'}>
                 Choose
                <MaterialSymbolsFileOpenRounded className="ml-1"/>
                </span>
            </Button>
            <input accept={accept} multiple={multiple} type={'file'} ref={inputRef} hidden onChange={handleFileChange}/>
        </div>
    </InputWrapper>
}

type ControlledProp = {
    control: any;
    name: string;
} & InputProps;
export const FormFilePicker = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
                <FilePicker
                    {...props}
                    {...field}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export default FilePicker;