import React from "react";
import {Controller} from "react-hook-form";
import {InputProps} from "@/components/ui/input";
import {InputWrapperSkeleton} from "@/components/ui/input-wrapper";
import {Skeleton} from "@/components/ui/skeleton";
import Chooser, {ChooserItem, ChooserProps} from "@/components/ui/chooser";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import MaterialSymbolsVideoCameraBackOutline from "@/components/icons/MaterialSymbolsVideoCameraBackOutline";

type Props = {
    children?: React.ReactNode
} & ChooserProps

const BackgroundChooser = (props: Props) => {
    return <Chooser className={'grid grid-cols-4'} {...props}>
        <ChooserItem title={'Flat'} className="col-span-1 aspect-[132/204]" contentClassName="bg-slate-800" value={1}>
        </ChooserItem>
        <ChooserItem title={'Gradient'} className="col-span-1 aspect-[132/204]"
                     contentClassName="bg-gradient-to-b from-white to-gray-600"
                     value={2}>
        </ChooserItem>
        <ChooserItem title={'Image'} className="col-span-1 aspect-[132/204]"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={3}>
            <MaterialSymbolsImageOutline className={'h-14 w-14'}/>
        </ChooserItem>
        <ChooserItem title={'Video'} className="col-span-1 aspect-[132/204]"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={4}>
            <MaterialSymbolsVideoCameraBackOutline className={'h-14 w-14'}/>
        </ChooserItem>

    </Chooser>
}


type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormBackgroundChooser = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState, formState}) => (
                <BackgroundChooser
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

export const BackgroundChooserSkeleton = ({}: InputProps) => {
    return <InputWrapperSkeleton>
        <div className={'flex flex-row gap-x-4'}>
            <Skeleton className={'w-[150px] min-h-[150px] rounded-2xl'}/>
            <Skeleton className={'w-[150px] min-h-[150px] rounded-2xl'}/>
        </div>
    </InputWrapperSkeleton>
}

export default BackgroundChooser;