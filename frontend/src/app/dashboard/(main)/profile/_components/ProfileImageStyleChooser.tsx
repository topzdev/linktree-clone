import React from "react";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import {RadioGroup, RadioGroupItem, RadioGroupProps} from "@/components/ui/radio-group";
import {Controller} from "react-hook-form";
import {Input, InputProps} from "@/components/ui/input";

type Props = {
    children?: React.ReactNode
} & InputWrapperProps &  RadioGroupProps;

const imageStyles = [
    {
        title: 'Avatar',
        image: '/image-style/1.png',
        value: '1',
    },
    {
        title: 'Background',
        image: '/image-style/2.png',
        value: '2',
    }
]

const ProfileImageStyleChooser = ({children, className, error, hint, label, id, ...props}: Props) => {
    const inputWrapperProps = {className, error,  hint, label, id};
    return <InputWrapper {...inputWrapperProps}>
        <RadioGroup {...props} className={'flex flex-row gap-x-4'} >
            {imageStyles.map(item =>
                <RadioGroupItem showIndicator={false}
                                className="flex items-center flex-col text-inherit border-0 min-w-[150px] h-auto gap-y-2 data-[state=checked]:text-primary group"
                                value={item.value} id={item.value}>
                    <div
                        className={'h-full w-full rounded-2xl border-transparent border-[3px] overflow-hidden relative min-h-[150px] group-data-[state=checked]:border-primary'}>
                        <Image src={item.image}
                               fill
                               alt={item.title}
                               style={{
                                   objectFit: 'cover', // cover, contain, none
                               }}
                        />
                    </div>
                    <Typography variant={'small'}>{item.title}</Typography>
                </RadioGroupItem>
            )}
        </RadioGroup>
    </InputWrapper>
}


type ControlledProp = {
    control: any;
    name: string;
} & InputProps;
export const FormProfi = ({name, control, ...props}: ControlledProp) => {
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


export default ProfileImageStyleChooser;