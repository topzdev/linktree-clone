import React, {useEffect, useState} from "react";
import LinkThumbnailUploader from "@/app/dashboard/(main)/_components/cards/LinkThumbnailUploader";
import LinkInputField from "@/app/dashboard/(main)/_components/cards/LinkInputField";
import {useMutation} from "@tanstack/react-query";
import linkServices from "@/services/links";
import {FetchError} from "ofetch";
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
    const updatePreview = useDashboardStore(state => state.updatePreview);
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

    const [thumbnail, setThumbnail] = useState(value.thumbnail_url);

    const useUploadThumbnail = useMutation({
        mutationFn: (file: File) => {
            return linkServices.updateThumbnail(value.id, file);
        },
        onSuccess(data, variables, context) {
            setThumbnail(data.url);
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

    const handleThumbnailUpload = async (file: File) => {
        await useUploadThumbnail.mutate(file);
    }
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
        <LinkThumbnailUploader loading={useUploadThumbnail.isPending} image={thumbnail}
                               title={value.title}
                               onImageUpload={handleThumbnailUpload}/>

        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col w-full pr-4'}>
            <LinkInputField placeholder={'Enter title here'} control={control} name={'title'} as={'div'}
                            foreground={'primary'}
                            variant={'large'}/>
            <LinkInputField placeholder={'Enter URL here'} control={control} name={'url'} as={'div'}
                            foreground={'primary'}
                            variant={'subtitle'}/>

            <AutoSave defaultValues={value} onSubmit={onSubmit}/>
        </form>

    </FormProvider>
}

export default LinkMainUrlForm;