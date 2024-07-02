import React from "react";
import {Controller} from "react-hook-form";
import {InputProps} from "@/components/ui/input";
import {InputWrapperSkeleton} from "@/components/ui/input-wrapper";
import {Skeleton} from "@/components/ui/skeleton";
import Chooser, {ChooserItem, ChooserProps} from "@/components/ui/chooser";
import {imageStyles} from "@/app/dashboard/(main)/profile/_components/ProfileForm";
import Image from "next/image";

type Props = {
    children?: React.ReactNode
} & ChooserProps

const ProfileStyleChooser = (props: Props) => {
    return <Chooser {...props}>
        {imageStyles.map(item => <ChooserItem title={item.title} className="min-w-[150px] w-auto aspect-square"
                                              value={item.value}>
            <Image src={item.image}
                   fill
                   alt={item.title}
                   style={{
                       objectFit: 'cover', // cover, contain, none
                   }}
            />
        </ChooserItem>)}
    </Chooser>
}


type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormProfileStyleChooser = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState, formState}) => (
                <ProfileStyleChooser
                    {...props}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const ProfileStyleChooserSkeleton = ({}: InputProps) => {
    return <InputWrapperSkeleton>
        <div className={'flex flex-row gap-x-4'}>
            <Skeleton className={'w-[150px] min-h-[150px] rounded-2xl'}/>
            <Skeleton className={'w-[150px] min-h-[150px] rounded-2xl'}/>
        </div>
    </InputWrapperSkeleton>
}

export default ProfileStyleChooser;