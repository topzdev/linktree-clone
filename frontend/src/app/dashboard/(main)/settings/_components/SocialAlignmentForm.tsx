import React, {useEffect} from "react";
import socialsServices, {UserSocials} from "@/services/socials";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {CardContent, CardHeader} from "@/components/ui/card";
import {FormRadioGroup, RadioGroupItem, RadioGroupItemSkeleton, RadioGroupSkeleton} from "@/components/ui/radio-group";
import {useMutation} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import Typography, {TypographySkeleton} from "@/components/ui/typography";

type Props = {
    value: UserSocials
    children?: React.ReactNode
}
const schema = yup.object().shape({
    alignment: yup.number().required().nullable().label('Alignment')
})

const alignmentItems = [
    {
        label: 'Top',
        value: 1,
    },
    {
        label: 'Bottom',
        value: 2,
    }
];

type SocialAlignmentSchemaForm = yup.InferType<typeof schema>;
const SocialAlignmentForm = ({value}: Props) => {
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();
    const methods = useForm<SocialAlignmentSchemaForm>({
        defaultValues: {
            alignment: value.alignment
        }
    });

    useEffect(() => {
        reset({
            alignment: value.alignment
        })
    }, [value]);

    const {
        control,
        handleSubmit,
        reset,
        formState,
        getValues,
        trigger,
        formState: {isSubmitSuccessful}
    } = methods

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateContent = useMutation({
        mutationFn: (data: SocialAlignmentSchemaForm) => {
            return socialsServices.updateSocialAlign(data.alignment);
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
    const onSubmit = async (data: SocialAlignmentSchemaForm) => {
        await useUpdateContent.mutate(data);
        setSubmittedData(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({...submittedData});
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    return <>
        <CardHeader className={'max-md:flex-col max-md:gap-y-3 !pb-0'}>
            <Typography variant="h4">Position</Typography>
            <Typography variant="p-ui" foreground="secondary">Display icons at the:</Typography>
        </CardHeader>

        <CardContent>
            <FormProvider {...methods}>
                <FormRadioGroup control={control} name={'alignment'} className={'gap-y-4'}>
                    {alignmentItems.map(item => <div key={item.label} className="flex items-center space-x-3">
                            <RadioGroupItem value={item.value} id={item.label}/>
                            <Typography variant={'p-ui'} as={'label'} htmlFor={item.label}>{item.label}</Typography>
                        </div>
                    )}
                </FormRadioGroup>
                <AutoSave defaultValues={value} onSubmit={onSubmit}/>
            </FormProvider>
        </CardContent>
    </>


}

export const SocialAlignmentFormSkeleton = () => {

    return <CardContent className={'flex flex-col justify-center items-center gap-y-4 w-full'}>
        <div className='flex max-md:flex-col gap-4 mb-4 w-full'>
            <div className={'flex flex-col items-start gap-y-2.5'}>
                <TypographySkeleton>Position</TypographySkeleton>
                <TypographySkeleton>Display icons at the:</TypographySkeleton>
            </div>
        </div>

        <RadioGroupSkeleton withLabel={false}>
            <div className="flex items-center space-x-3">
                <RadioGroupItemSkeleton/>
                <TypographySkeleton variant={'p-ui'}>Top</TypographySkeleton>
            </div>
            <div className="flex items-center space-x-3">
                <RadioGroupItemSkeleton/>
                <TypographySkeleton variant={'p-ui'}>Bottom</TypographySkeleton>
            </div>
        </RadioGroupSkeleton>


    </CardContent>
}

export default SocialAlignmentForm;