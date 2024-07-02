import React, {useMemo} from "react";
import {Controller} from "react-hook-form";
import {InputProps} from "@/components/ui/input";
import Chooser, {ChooserItem, ChooserItemSkeleton, ChooserProps, ChooserSkeleton} from "@/components/ui/chooser";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import MaterialSymbolsVideoCameraBackOutline from "@/components/icons/MaterialSymbolsVideoCameraBackOutline";
import Image from 'next/image'
import {CustomThemeForm} from "@/app/dashboard/(main)/themes/_components/CustomThemeForm";
import {Loader2} from "lucide-react";

type Props = {
    children?: React.ReactNode,
    image?: CustomThemeForm['bg_image'],
    video?: CustomThemeForm['bg_video'],
    bg_color?: CustomThemeForm['bg_color'],
    bg_from?: CustomThemeForm['bg_from'],
    bg_to?: CustomThemeForm['bg_to'],
    position?: CustomThemeForm['bg_position'],
    loading?: boolean,
    value?: number,
} & Omit<ChooserProps, 'value'>


export const DEFAULT_FLAT_BG = '#1e293b';
export const DEFAULT_BG_FROM = '#1e293b'
export const DEFAULT_BG_TO = '#444444';
export const DEFAULT_BG_POSITION = '0deg';

const BackgroundChooserItemLoader = () => {
    return <div
        className={'absolute h-full w-full top-0 left-0 z-10 flex items-center justify-center bg-slate-500/50'}>
        <Loader2
            className="animate-spin text-white mr-1"/>
    </div>
}
const BackgroundChooser = ({video, image, bg_color, bg_from, bg_to, position, loading, ...props}: Props) => {

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


    return <Chooser className={'grid grid-cols-4 gap-x-2 sm:gap-x-4'} {...props}>
        <ChooserItem title={'Flat'} className="col-span-1 aspect-[132/204] min-w-full w-full"
                     value={1}>
            <div className={'h-full w-full flex items-center justify-center'} style={flatPreview}>
                {loading && props.value === 1 && <BackgroundChooserItemLoader/>}
            </div>
        </ChooserItem>
        <ChooserItem title={'Gradient'} className="col-span-1 aspect-[132/204] min-w-full w-full"
                     value={2}>
            <div className={'h-full w-full flex items-center justify-center'} style={gradientPreview}>
                {loading && props.value === 2 && <BackgroundChooserItemLoader/>}
            </div>
        </ChooserItem>
        <ChooserItem title={'Image'} className="col-span-1 aspect-[132/204] min-w-full w-full"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={3}>
            {loading && props.value === 3 && <BackgroundChooserItemLoader/>}
            {imagePreview ?
                (<Image
                    src={imagePreview}
                    alt={'Image Preview'}
                    fill className={'h-full w-full'}
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}></Image>) :
                <MaterialSymbolsImageOutline className={'h-10 w-10 md:h-14 md:w-14'}/>
            }
        </ChooserItem>
        <ChooserItem title={'Video'} className="col-span-1 aspect-[132/204] min-w-full w-full"
                     contentClassName="bg-slate-100 flex !text-foreground-primary items-center justify-center"
                     value={4}>
            {loading && props.value === 4 && <BackgroundChooserItemLoader/>}
            {videoPreview ?
                (<video key={videoPreview} width={132} height={204} className={'h-full w-full object-cover absolute'}>
                    <source src={videoPreview} type="video/mp4"/>
                </video>) :
                <MaterialSymbolsVideoCameraBackOutline className={'h-10 w-10 md:h-14 md:w-14'}/>
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
                    value={field.value as number}
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(Number(value))}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const BackgroundChooserSkeleton = ({}: InputProps) => {
    return <ChooserSkeleton className={'grid grid-cols-4'}>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204] min-w-full w-full'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204] min-w-full w-full'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204] min-w-full w-full'}/>
        <ChooserItemSkeleton className={'col-span-1 aspect-[132/204] min-w-full w-full'}/>
    </ChooserSkeleton>
}

export default BackgroundChooser;