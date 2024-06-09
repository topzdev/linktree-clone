import React, {useEffect} from "react";
import LinkInputField from "@/app/dashboard/(main)/_components/links/LinkInputField";
import {FieldArrayWithId, FormProvider, useForm} from "react-hook-form";
import {LinkForm, LinksForm} from "@/app/dashboard/(main)/_components/links/LinksList";
import {yupResolver} from "@hookform/resolvers/yup";
import {contentSchema} from "@/app/dashboard/(main)/_components/links/LinkMainCard";
import {useToast} from "@/components/ui/use-toast";
import debounce from "debounce";
import AutoSave from "@/components/utils/AutoSave";
import useDashboardStore from "@/stores/dashboard";

type Props = {
    children?: React.ReactNode,
    value: FieldArrayWithId<LinksForm, "links", "_id">,
    update: debounce.DebouncedFunction<(data: LinkForm) => Promise<void>>
}

const LinkMainUrlForm = ({value, update}: Props) => {
    const {toast} = useToast()

    const methods = useForm<LinkForm>({
        mode: 'onChange',
        defaultValues: value,
        resolver: yupResolver(contentSchema),
    });
    const {
        control,
        handleSubmit,
        reset,
        formState,
        formState: {isSubmitSuccessful}
    } = methods

    const [submittedData, setSubmittedData] = React.useState({});
    const onSubmit = async (data: LinkForm) => {
        await update(data);
        setSubmittedData(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({...submittedData});
        }
    }, [isSubmitSuccessful, submittedData, reset]);


    return <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col w-full pr-4'}>
            <LinkInputField inputClassName="text-center" placeholder={"Enter your Headline title here"} control={control} name={'title'} as={'div'} foreground={'primary'} variant={'large'}/>
            <AutoSave defaultValues={value} onSubmit={onSubmit}/>
        </form>
    </FormProvider>
}

export default LinkMainUrlForm;