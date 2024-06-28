import React, {useMemo} from "react";
import {Controller} from "react-hook-form";
import {InputProps} from "@/components/ui/input";
import {InputWrapperSkeleton} from "@/components/ui/input-wrapper";
import {Skeleton} from "@/components/ui/skeleton";
import Chooser, {ChooserItem, ChooserProps} from "@/components/ui/chooser";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import MaterialSymbolsVideoCameraBackOutline from "@/components/icons/MaterialSymbolsVideoCameraBackOutline";
import Image from 'next/image'
import {CustomThemeForm} from "@/app/dashboard/(main)/themes/_components/CustomThemeForm";

type Props = {
    children?: React.ReactNode,
    image?: CustomThemeForm['bg_image'],
    video?: CustomThemeForm['bg_video'],
    bg_color?: CustomThemeForm['bg_color'],
    bg_from?: CustomThemeForm['bg_from'],
    bg_to?: CustomThemeForm['bg_to'],
    position?: CustomThemeForm['bg_position'],
} & ChooserProps


export const DEFAULT_FLAT_BG = '#1e293b';
export const DEFAULT_BG_FROM = '#1e293b'
export const DEFAULT_BG_TO = '#444444';
export const DEFAULT_BG_POSITION = '0deg';
const BackgroundChooser = ({video, image, bg_color, bg_from, bg_to, position, ...props}: Props) => {

    const imagePreview = useMemo(() => {
        if (typeof image === "string") {
            return image
        }
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }
    }, [image])

    const videoPreview = useMemo(() => {
        if (typeof video === "string") {
            return video
        }
        if (video instanceof File) {
            return URL.createObjectURL(video);
        }
    }, [video]);

    const flatPreview = useMemo(() => {
        const style = {background: DEFAULT_FLAT_BG}
        if (bg_color) {
            style.background = bg_color
        }
        return style
    }, [bg_color]);

    const gradientPreview = useMemo(() => {
        const style: React.CSSProperties = {
            background: `linear-gradient(${DEFAULT_BG_POSITION}, ${DEFAULT_BG_TO}, ${DEFAULT_BG_FROM})`
        };
        if (bg_from && position && bg_to) {
            style.background = `linear-gradient(${position}, ${bg_to}, ${bg_from})`
        }
        return style;
    }, [bg_from, bg_to, position])


    return <Chooser className={'grid grid-cols-4'} {...props}>
        <ChooserItem title={'Flat'} className="col-span-1 aspect-[132/204]"
                     value={1}>
            <div className={'h-full w-full'} style={flatPreview}>
            </div>
        </ChooserItem>
        <ChooserItem title={'Gradient'} className="col-span-1 aspect-[132/204]"
                     value={2}>
            <div className={'h-full w-full'} style={gradientPreview}>
            </div>
        </ChooserItem>
        <ChooserItem title={'Image'} className="col-span-1 aspect-[132/204]"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={3}>
            {imagePreview ?
                (<Image
                    src={imagePreview}
                    alt={'Image Preview'}
                    fill className={'h-full w-full'}
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}></Image>) :
                <MaterialSymbolsImageOutline className={'h-14 w-14'}/>
            }
        </ChooserItem>
        <ChooserItem title={'Video'} className="col-span-1 aspect-[132/204]"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={4}>

            {videoPreview ?
                (<video width={132} height={204} className={'h-full w-full object-cover absolute'}>
                    <source src={videoPreview} type="video/mp4"/>
                </video>) :
                <MaterialSymbolsVideoCameraBackOutline className={'h-14 w-14'}/>
            }
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