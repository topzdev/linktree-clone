import React, {useState} from "react";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import {Input, InputProps} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type Props = {
    children?: React.ReactNode,
    inputProps: InputProps,
} & InputWrapperProps;

const defaultSolidColors = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
];
const ColorPicker = ({
                         label,
                         error,
                         hint,
                         className,
                         inputProps,
                         ...props
                     }: Props) => {

    const [color, setColor] = useState('red');
    const inputWrapperProps = {id: props.id, error, hint, className, label}
    return <InputWrapper className={'flex w-full'} label={label}>
        <div className="flex gap-x-2.5">

            <Popover>
                <PopoverTrigger>
                    <div style={{
                        background: color,
                    }} className={'min-h-[52px] w-[52px] min-w-[52px] rounded-2xl border border-border'}>

                    </div>
                </PopoverTrigger>
                <PopoverContent align={'start'}>
                    <div className="grid grid-cols-12">
                        {defaultSolidColors.map(item => <div style={{
                            background: item,
                        }} className={'col-span-3'}></div>)}
                    </div>
                </PopoverContent>
            </Popover>

            <Input {...inputProps} value={color} onChange={(e) => setColor(e.target.value)}/>
        </div>
    </InputWrapper>
}

export default ColorPicker;