import React, {useEffect} from "react";
import {Card, CardContent} from "@/components/ui/card";
import * as yup from "yup";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import {Control, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import {ColorPickerSkeleton, FormColorPicker} from "@/components/ui/color-picker";
import themesServices, {ReturnTheme} from "@/services/themes";
import {
    BackgroundChooserSkeleton,
    DEFAULT_BG_FROM,
    DEFAULT_BG_POSITION,
    DEFAULT_BG_TO,
    DEFAULT_FLAT_BG,
    FormBackgroundChooser
} from "@/app/dashboard/(main)/themes/_components/BackgroundChooser";
import {
    FormSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FormFilePicker} from "@/components/ui/file-picker";

type Props = {
    children?: React.ReactNode,
    value: ReturnTheme
}

const gradientPosition = [
    {
        name: 'Top',
        value: '0deg'
    },
    {
        name: 'Bottom',
        value: '180deg'
    },
    {
        name: 'Left',
        value: '270deg'
    },
    {
        name: 'Right',
        value: '90deg'
    },
]

export const themeSchema = yup.object().shape({
    bg_id: yup.number().required().label('Background'),
    bg_image: yup.mixed().when('bg_id', {
        is: (value: number) => value === 3,
        then: (s) => s.notRequired(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Background Image'),
    bg_video: yup.mixed().when('bg_id', {
        is: (value: number) => value === 4,
        then: (s) => s.notRequired(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Background Video'),
    bg_color: yup.string().when('bg_id', {
        is: (value: number) => value === 1,
        then: (s) => s.required(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Background Color'),
    bg_from: yup.string().when('bg_id', {
        is: (value: number) => value === 2,
        then: (s) => s.required(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Background From'),
    bg_to: yup.string().when('bg_id', {
        is: (value: number) => value === 2,
        then: (s) => s.required(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Background To'),
    bg_position: yup.string().when('bg_id', {
        is: (value: number) => value === 2,
        then: (s) => s.required(),
        otherwise: (s) => s.notRequired()
    }).nullable().label('Gradient Position'),
});


export type CustomThemeForm = yup.InferType<typeof themeSchema>
const CustomThemeForm = ({value}: Props) => {
    const queryClient = useQueryClient();
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();

    const methods = useForm<CustomThemeForm>({
        mode: 'onChange',
        resolver: yupResolver(themeSchema),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState,
        getValues,
        trigger,
        formState: {isSubmitSuccessful}
    } = methods;

    useEffect(() => {
        reset({
            bg_id: value.bg_id,
            bg_color: value.bg_color || DEFAULT_FLAT_BG,
            bg_from: value.bg_from || DEFAULT_BG_FROM,
            bg_to: value.bg_to || DEFAULT_BG_TO,
            bg_position: value.bg_position || DEFAULT_BG_POSITION,
            bg_image: null,
            bg_video: null
        })
    }, [value]);

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateContent = useMutation({
        mutationFn: (data: CustomThemeForm) => {
            return themesServices.updateCustom(data);
        },
        onSuccess(data, variables, context) {
            queryClient.setQueryData(
                ['theme'],
                (oldData: ReturnTheme) => {
                    return {
                        ...oldData,
                        bg_id: data.bg_id,
                        theme_id: data.theme_id,
                        bg_image: data.bg_image,
                        bg_video: data.bg_video
                    };
                },
            )
            updatePreview();
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: 'Something went wrong',
                description: error.data.message,
                variant: 'destructive'
            })
        },
    })
    const onSubmit = async (data: CustomThemeForm) => {
        await useUpdateContent.mutate(data);
        setSubmittedData(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({...submittedData});
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    return <Card>
        <CardContent className={'flex flex-col gap-y-4'}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={'grid grid-cols-12 gap-y-4'}>
                    <div className="col-span-12">
                        <FormBackgroundChooser
                            loading={useUpdateContent.isPending}
                            image={value.bg_image_url}
                            video={value.bg_video_url}
                            bg_color={getValues('bg_color')}
                            bg_from={getValues('bg_from')}
                            bg_to={getValues('bg_to')}
                            position={getValues('bg_position')}
                            control={control}
                            name={'bg_id'}/>
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-3 md:gap-4">
                        <ThemeFormField defaultBgImage={value.bg_image_url} defaultBgVideo={value.bg_video_url}
                                        control={control} bg_id={getValues('bg_id')}/>
                    </div>
                    <AutoSave defaultValues={value} onSubmit={onSubmit}/>
                </form>
            </FormProvider>
        </CardContent>
    </Card>
}


type ThemeFormFieldProps = {
    control: Control<CustomThemeForm>,
    bg_id: CustomThemeForm['bg_id'],
    defaultBgImage: string | null,
    defaultBgVideo: string | null,
}
const ThemeFormField = ({defaultBgImage, defaultBgVideo, control, bg_id}: ThemeFormFieldProps) => {
    switch (bg_id) {
        case 1:
        default:
            return <div key={'bg_color'}
                        className="col-span-12 sm:col-span-6">
                <FormColorPicker
                    control={control}
                    name={'bg_color'}
                    label={'Flat Background Color'}
                    placeholder={'Pick or enter flat background color'}/>
            </div>
        case 2:
            return <>
                <div
                    key={'bg_from'}
                    className="col-span-12 sm:col-span-6">
                    <FormColorPicker
                        control={control}
                        name={'bg_from'}
                        label={'From Background Color'}
                        placeholder={'Pick from background color'}/>
                </div>

                <div
                    key={'bg_to'}
                    className="col-span-12 sm:col-span-6">
                    <FormColorPicker
                        control={control}
                        name={'bg_to'}
                        label={'To Background Color'}
                        placeholder={'Pick to background color'}/>
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <FormSelect label={'Position'} control={control} name={'bg_position'}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gradient position"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Position</SelectLabel>
                                {gradientPosition.map(item =>
                                    <SelectItem value={item.value}>{item.name}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </FormSelect>
                </div>

            </>
        case 3:
            return <div key={'bg_image'} className='col-span-12'>
                <FormFilePicker defaultValue={defaultBgImage as string}
                                accept={'image/*'} control={control}
                                name={'bg_image'}
                                label={'Upload Image'}/>
            </div>
        case 4:
            return <div key={'bg_video'} className='col-span-12'>
                <FormFilePicker defaultValue={defaultBgVideo as string}
                                accept={'video/*'}
                                control={control}
                                name={'bg_video'}
                                label={'Upload Video'}/>
            </div>
    }

    return <></>
}

export const CustomThemeSkeleton = () => {
    return <Card>
        <CardContent className={'flex flex-col justify-center items-center gap-y-4'}>
            <BackgroundChooserSkeleton/>

            <div className="grid grid-cols-12 gap-5 w-full">
                <div className="col-span-12 sm:col-span-6">
                    <ColorPickerSkeleton/>
                </div>
            </div>
        </CardContent>
    </Card>
}

export default CustomThemeForm;
