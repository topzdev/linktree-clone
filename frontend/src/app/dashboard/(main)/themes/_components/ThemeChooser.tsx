import React from "react";
import {Controller} from "react-hook-form";
import {InputProps} from "@/components/ui/input";
import Chooser, {ChooserItem, ChooserItemSkeleton, ChooserProps, ChooserSkeleton} from "@/components/ui/chooser";
import Image from "next/image";
import {ThemesPreview} from "@/services/themes";

type Props = {
    children?: React.ReactNode,
    loading?: boolean,
    items: ThemesPreview[]
} & ChooserProps

const ThemeChooser = ({loading, items, ...props}: Props) => {

    return <Chooser className={'grid grid-cols-4 gap-4'} {...props}>
        {items.map(item => <ChooserItem key={item.id} title={item.title} className="col-span-1 aspect-[132/204]"
                                        value={item.id}>
            {item.preview_url && <Image
                src={item.preview_url}
                alt={item.title}
                fill className={'h-full w-full'}
                style={{
                    objectFit: 'cover',
                }}></Image>}
        </ChooserItem>)}
    </Chooser>
}


type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormThemeChooser = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState, formState}) => (
                <ThemeChooser
                    {...props}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(Number(value))}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const ThemeChooserSkeleton = ({}: InputProps) => {
    return <ChooserSkeleton className={'grid grid-cols-4 gap-4'}>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204]'}/>
    </ChooserSkeleton>
}

export default ThemeChooser;