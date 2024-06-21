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
import {useMutation, useQuery} from "@tanstack/react-query";
import {FetchError} from "ofetch";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import socialsServices from "@/services/socials";
import useFetchSocials from "@/hooks/useFetchSocials";
import Typography from "@/components/ui/typography";
import {cn} from "@/lib/utils";

type Props = {
    children?: React.ReactNode
}

export const schema = yup.object().shape({
    social_id: yup.string().required(),
    value: yup.string().required().label('URL'),
});

export type AddSocialForm = yup.InferType<typeof schema>;

const EditSocialFormModal = (props: Props) => {
    const fetchSocials = useFetchSocials();
    const {id} = useParams();
    const {data:info, isLoading} = useQuery({
        queryKey: ['one-social-' + id],
        queryFn: () => socialsServices.getOne(id),
    })
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const {reset, setValue, handleSubmit, control} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            social_id: '',
            value: ''
        }
    })
    useEffect(() => {
        if (!open) {
            router.push(pageRoutes.dashboard.socials.href);
        }
    }, [open, setOpen]);

    const social = useMemo(() => {
        const index = socialIcons.findIndex(item => item.id === info?.social_id);

        if (index != -1) {
            const temp = socialIcons[index];
            reset({
                social_id: info?.social_id as string,
                value: info?.value,
            })
            return temp;
        }

        return null;
    }, [info]);

    const handleBack = () => {
        router.back();
    }

    const handleFill = () => {
        setValue('value', social?.example)
    }

    const useUpdateContent = useMutation({
        mutationFn: (data: AddSocialForm) => {
            return socialsServices.update(info?.id, data);
        },
        async onSuccess(data, variables, context) {
            await fetchSocials.refetch();
            setOpen(false);
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

    const useDeleteSocial  = useMutation({
        mutationFn: () => {
            return socialsServices.delete(info?.id);
        },
        async onSuccess(data, variables, context) {
            await fetchSocials.refetch();
            setOpen(false);
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
            <DialogContent back={handleBack} className={cn('overflow-hidden gap-y-4', isLoading ? 'opacity-70' : '')}>
                <DialogHeader>
                    <DialogTitle>Edit {social?.title}</DialogTitle>
                </DialogHeader>

                <form className={'flex flex-col gap-y-2.5'} onSubmit={onSubmit}>
                    <FormInput
                        placeholder={`Enter your ${social?.title} URL`}
                        control={control}
                        name={'value'}
                    />
                    <Typography className={'cursor-pointer'} onClick={handleFill} variant={'small'}>{social?.example}</Typography>
                </form>
                <div className="flex flex-col gap-y-2">
                    <Button
                        onClick={onSubmit}
                        disabled={useUpdateContent.isPending}
                        loading={useUpdateContent.isPending}
                        size={'lg'} rounded>Save</Button>
                    <Button
                        onClick={() => useDeleteSocial.mutate()}
                        color={'accent'}
                        variant={'outlined'}
                        disabled={useDeleteSocial.isPending}
                        loading={useDeleteSocial.isPending}
                        size={'lg'} rounded>Remove Icon</Button>
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default EditSocialFormModal;