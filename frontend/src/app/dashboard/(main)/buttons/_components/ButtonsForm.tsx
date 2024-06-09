import React, {useEffect} from "react";
import {Card, CardContent} from "@/components/ui/card";
import InputWrapper from "@/components/ui/input-wrapper";
import {buttonsStyle} from "@/data/buttons-style";
import * as yup from "yup";
import ButtonsItem from "@/app/dashboard/(main)/buttons/_components/ButtonsItem";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import buttonsServices, {ReturnButtonsSettings} from "@/services/buttons";
import ColorPicker from "@/components/ui/color-picker";

type Props = {
    children?: React.ReactNode,
    value: ReturnButtonsSettings
}
const buttonsStyles = [
    {
        name: 'Fill',
        items: [
            buttonsStyle.fill,
            buttonsStyle.fillrounded,
            buttonsStyle.fillcircular,
        ]
    },
    {
        name: 'Outline',
        items: [
            buttonsStyle.outline,
            buttonsStyle.outlinerounded,
            buttonsStyle.outlinerounded,
        ]
    },
    {
        name: 'Soft Shadow',
        items: [
            buttonsStyle.softshadow,
            buttonsStyle.softshadowrounded,
            buttonsStyle.softshadowcircular,
        ]
    },
    {
        name: 'Hard Shadow',
        items: [
            buttonsStyle.hardshadow,
            buttonsStyle.hardshadowrounded,
            buttonsStyle.hardshadowcircular,
        ]
    },
]

export const buttonSchema = yup.object().shape({
    btn_color: yup.string(),
    btn_text_color: yup.string(),
    btn_shadow_color: yup.string(),
    btn_id: yup.number(),
});

export type ButtonForm = yup.InferType<typeof buttonSchema>


const ButtonsForm = ({value}: Props) => {
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();

    const methods = useForm<ButtonForm>({
        mode: 'onChange',
        defaultValues: value,
        resolver: yupResolver(buttonSchema),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState, getValues,
        trigger,
        formState: {isSubmitSuccessful}
    } = methods

    const useUpdateContent = useMutation({
        mutationFn: (data: ButtonForm) => {
            return buttonsServices.update(data);
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
    });

    const [submittedData, setSubmittedData] = React.useState({});

    const onSubmit = async (data: ButtonForm) => {
        // await useUpdateContent.mutate(data);
        setSubmittedData(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({...submittedData});
        }
    }, [isSubmitSuccessful, submittedData, reset]);


    return <Card className={'flex'}>
        <FormProvider {...methods}>
            <CardContent className={'flex flex-col w-full gap-y-5'}>

                {buttonsStyles.map(item =>
                    <InputWrapper key={item.name} label={item.name} className={'w-full'}>

                        <div className={'grid grid-cols-12 w-full gap-x-2.5'}>
                            {item.items.map(button => <ButtonsItem key={button.key} buttonType={button.key}/>)
                            }
                        </div>

                    </InputWrapper>
                )}

                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <ColorPicker
                            label={'Background Color'}
                            inputProps={{
                                placeholder: 'Background Color'
                            }}/>
                    </div>
                </div>
            </CardContent>
            <AutoSave defaultValues={value} onSubmit={onSubmit}/>
        </FormProvider>
    </Card>
}

export default ButtonsForm;