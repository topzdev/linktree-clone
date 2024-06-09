import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import * as yup from "yup";
import useDashboardStore from "@/stores/dashboard";
import {useToast} from "@/components/ui/use-toast";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {UpdateThumbnail} from "@/services/links";
import {FetchError} from "ofetch";
import profileServices, {ReturnProfile} from "@/services/profile";
import AvatarUploader from "@/app/dashboard/(main)/profile/_components/AvatarUploader";
import {Button} from "@/components/ui/button";
import {FormInput} from "@/components/ui/input";
import AutoSave from "@/components/utils/AutoSave";
import {FormTextarea} from "@/components/ui/textarea";
import {FormItemChooser} from "@/components/ui/item-chooser";
import ConsoleLog from "@/components/utils/ConsoleLog";

type Props = {
    children?: React.ReactNode,
    value: ReturnProfile
}


export const profileSchema = yup.object().shape({
    profile_avatar_url: yup.string(),
    profile_image_style: yup.string(),
    profile_title: yup.string(),
    profile_bio: yup.string()
});


const imageStyles = [
    {
        title: 'Avatar',
        image: '/image-style/1.png',
        value: '1',
    },
    {
        title: 'Background',
        image: '/image-style/2.png',
        value: '2',
    }
]

export type ProfileForm = yup.InferType<typeof profileSchema>
const ProfileForm = ({value}: Props) => {
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast();

    const methods = useForm<ProfileForm>({
        mode: 'onChange',
        defaultValues: value,
        resolver: yupResolver(profileSchema),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState, getValues,
        trigger,
        formState: {isSubmitSuccessful}
    } = methods

    const [submittedData, setSubmittedData] = React.useState({});

    const [avatar, setAvatar] = useState(value.profile_avatar_url);

    const useUpdateContent = useMutation({
        mutationFn: (data: ProfileForm) => {
            const {profile_title, profile_bio, profile_image_style} = data;
            return profileServices.update({
                profile_title: profile_title || '',
                profile_bio: profile_bio || '',
                profile_image_style: profile_image_style || ''
            });
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

    const useUpdateAvatar = useMutation({
        mutationFn: (file: File) => {
            return profileServices.updateAvatar(file);
        },
        onSuccess(data: UpdateThumbnail, variables, context) {
            setAvatar(data.url);
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

    const useDeleteAvatar = useMutation({
        mutationFn: () => {
            return profileServices.deleteAvatar();
        },
        onSuccess(data, variables, context) {
            setAvatar('');
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

    const handleAvatarUpload = async (file: File) => {
        await useUpdateAvatar.mutate(file);
    }

    const handleAvatarRemove = async () => {
        await useDeleteAvatar.mutate();
    }

    const onSubmit = async (data: ProfileForm) => {
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
            <AvatarUploader initials={value.profile_initials} title={value?.profile_title} loading={useUpdateAvatar.isPending ||  useDeleteAvatar.isPending}
                            onImageUpload={handleAvatarUpload} onImageRemove={handleAvatarRemove} image={avatar}/>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={'grid grid-cols-12 gap-y-4'}>
                    <div className="col-span-12">
                        <FormItemChooser control={control} name={'profile_image_style'} items={imageStyles}/>
                    </div>

                    <div className="col-span-12">
                        <FormInput
                            control={control}
                            name={'profile_title'}
                            label={'Profile Title'}
                            placeholder={'Enter URL here'}/>
                    </div>
                    <div className="col-span-12">
                        <FormTextarea control={control}
                                      name={'profile_bio'}
                                      label={'Profile Bio'}
                                      placeholder={'Enter Bio here'}/>
                    </div>
                    <AutoSave defaultValues={value} onSubmit={onSubmit}/>
                </form>
            </FormProvider>
        </CardContent>
    </Card>
}

export default ProfileForm;