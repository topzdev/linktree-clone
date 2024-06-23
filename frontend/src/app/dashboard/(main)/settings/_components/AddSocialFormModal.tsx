"use client"

import React, {useEffect, useMemo, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import pageRoutes from "@/configs/page-routes";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import socialIcons from "@/data/social-icons";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormInput} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import socialsServices from "@/services/socials";
import useFetchSocials from "@/hooks/api/useFetchSocials";
import Typography from "@/components/ui/typography";

type Props = {
    children?: React.ReactNode
}

export const schema = yup.object().shape({
    social_id: yup.string().required(),
    value: yup.string().required().label('URL'),
});

export type AddSocialForm = yup.InferType<typeof schema>;

const AddSocialFormModal = (props: Props) => {
    const fetchSocials = useFetchSocials()
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const {social_id} = useParams();

    const {reset, setValue, handleSubmit, control} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            social_id: '',
            value: ''
        }
    })
    useEffect(() => {
        if (!open) {
            router.push(pageRoutes.dashboard.settings.socials.href);
        }
    }, [open, setOpen]);

    const social = useMemo(() => {
        const index = socialIcons.findIndex(item => item.id === social_id);

        if (index != -1) {
            const info = socialIcons[index];
            reset({
                social_id: social_id as string,
                value: '',
            })
            return info;
        }

        return null;
    }, [social_id]);

    const handleBack = () => {
        router.back();
    }

    const handleFill = () => {
        setValue('value', social?.example)
    }

    const useUpdateContent = useMutation({
        mutationFn: (data: AddSocialForm) => {
            return socialsServices.add(data);
        },
        async onSuccess(data, variables, context) {
            console.log('Updated Social Data', data)
            setOpen(false);
            await fetchSocials.refetch();
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


    const onSubmit = handleSubmit(async (value) => {
        await useUpdateContent.mutate(value);
    });

    return <>
        <Dialog defaultOpen={true} open={open} onOpenChange={setOpen}>
            <DialogContent back={handleBack} className={'overflow-hidden gap-y-2.5'}>
                <DialogHeader>
                    <DialogTitle>Add {social?.title}</DialogTitle>
                </DialogHeader>

                <form className={'flex flex-col gap-y-2.5'} onSubmit={onSubmit}>
                    <FormInput
                        placeholder={`Enter your ${social?.title} URL`}
                        control={control}
                        name={'value'}
                    />
                    <Typography className={'cursor-pointer'} onClick={handleFill}
                                variant={'small'}>{social?.example}</Typography>

                    <Button
                        disabled={useUpdateContent.isPending}
                        loading={useUpdateContent.isPending}
                        type={'submit'}
                        size={'lg'} rounded>Add Icon</Button>
                </form>
            </DialogContent>
        </Dialog>
    </>
}

export default AddSocialFormModal;