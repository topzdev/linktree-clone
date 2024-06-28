import React, {useEffect, useMemo} from "react";
import {Card, CardContent} from "@/components/ui/card";
import * as yup from "yup";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import {Control, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import {FormColorPicker} from "@/components/ui/color-picker";
import themesServices, {ReturnTheme} from "@/services/themes";
import {FormBackgroundChooser} from "@/app/dashboard/(main)/themes/_components/BackgroundChooser";
import {
    FormSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import FilePicker from "@/components/ui/file-picker";

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
    bg_video: yup.string().required().nullable().label('Background'),
    bg_image: yup.string().required().nullable().label('Background'),
    bg_color: yup.string().required().nullable().label('Background Color'),
    bg_color2: yup.string().required().nullable().label('Background Color'),
    bg_position: yup.string().required().nullable().label('Gradient Position'),
});


export type CustomThemeForm = yup.InferType<typeof themeSchema>
const CustomThemeForm = ({value}: Props) => {
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
            // bg_id: value.bg_id || 1,
            bg_id: 3,
            bg_color: value.bg_color,
            bg_color2: value.bg_color2,
            bg_position: value.bg_position || gradientPosition[0].value,
        })
    }, [value]);

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateContent = useMutation({
        mutationFn: (data: CustomThemeForm) => {
            return themesServices.updateCustom(data);
        },
        onSuccess(data, variables, context) {
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
                        <FormBackgroundChooser control={control} name={'bg_id'}/>
                        {getValues('bg_id')}
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-5">
                        <ThemeFormField control={control} bg_id={getValues('bg_id')}/>
                    </div>
                    <AutoSave defaultValues={value} onSubmit={onSubmit}/>
                </form>
            </FormProvider>
        </CardContent>
    </Card>
}


type ThemeFormFieldProps = {
    control: Control<CustomThemeForm>,
    bg_id: CustomThemeForm['bg_id']
}
const ThemeFormField = ({control, bg_id}: ThemeFormFieldProps) => {
    return useMemo(() => {
        switch (bg_id) {
            case 1:
            default:
                return <div className="col-span-6">
                    <FormColorPicker
                        control={control}
                        name={'bg_color'}
                        label={'Flat Background Color'}
                        placeholder={'Pick or enter flat background color'}/>
                </div>
            case 2:
                return <>
                    <div className="col-span-6">
                        <FormColorPicker
                            control={control}
                            name={'bg_color'}
                            label={'From Background Color'}
                            placeholder={'Pick from background color'}/>
                    </div>

                    <div className="col-span-6">
                        <FormColorPicker
                            control={control}
                            name={'bg_color2'}
                            label={'To Background Color'}
                            placeholder={'Pick to background color'}/>
                    </div>

                    <div className="col-span-6">
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
                return <div className='col-span-12'>
                    <FilePicker label={'Upload Image'}/>
                </div>
            case 4:
                return <div className='col-span-12'>
                    <FilePicker label={'Upload Video'}/>
                </div>
        }
    }, [bg_id]);
}

export const CustomThemeSkeleton = () => {
    return <Card>
        <CardContent className={'flex flex-col justify-center items-center gap-y-4'}>

        </CardContent>
    </Card>
}

export default CustomThemeForm;
