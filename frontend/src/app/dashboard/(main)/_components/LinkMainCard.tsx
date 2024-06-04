import React, {useState} from "react";
import MaterialSymbolsDragIndicator from "@/components/icons/MaterialSymbolsDragIndicator";
import {Card, CardContent} from "@/components/ui/card";
import LinkThumbnailUploader from "@/app/dashboard/(main)/_components/cards/LinkThumbnailUploader";
import {Switch} from "@/components/ui/switch";
import {IconButton} from "@/components/ui/icon-button";
import IcOutlineDeleteOutline from "@/components/icons/IcOutlineDeleteOutline";
import {FieldArrayWithId, UseFieldArrayUpdate, useForm} from "react-hook-form";
import {LinkForm, linkSchema, LinksForm} from "@/app/dashboard/(main)/_components/LinksList";
import debounce from "debounce";
import {yupResolver} from "@hookform/resolvers/yup";
import LinkInputField from "@/app/dashboard/(main)/_components/cards/LinkInputField";
import linkServices from "@/services/links";
import {useToast} from "@/components/ui/use-toast";
import {FetchError} from "ofetch";
import {useMutation} from "@tanstack/react-query";
import * as yup from "yup";

type Props = {
    children?: React.ReactNode,
    update: UseFieldArrayUpdate<LinksForm>,
    index: number,
    value: FieldArrayWithId<LinksForm, "links", "_id">,
    handle: any
    onDelete: (index: number) => void
}


export const contentSchema = yup.object().shape({
    url: yup.string().url().nullable(),
    title: yup.string().max(44).min(0).required().nullable(),
});

const LinkMainCard = ({value, index, handle, onDelete}: Props) => {
    const {toast} = useToast()
    const [isEnabled, setEnabled] = useState(value.is_enabled);

    const {control, handleSubmit} = useForm<LinkForm>({
        resolver: yupResolver(contentSchema),
        mode: 'all',
        defaultValues: value
    });

    const hello = useForm<LinkForm>({
        resolver: yupResolver(linkSchema),
        mode: 'onBlur',
        defaultValues: value
    });

    const useUploadThumbnail = useMutation({
        mutationFn: (file: File) => {
            return linkServices.updateThumbnail(value.id || '', file);
        },
        onSuccess(data, variables, context) {
           hello.setValue('thumbnail_url', data.url);
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: 'Something went wrong',
                description: error.data.message,
                variant: 'destructive'
            })
        },
    })

    const useUpdateContent = useMutation({
        mutationFn: (data: LinkForm) => {
            return linkServices.update(value.id || '', {
                url: data.url,
                title: data.title
            })
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: 'Something went wrong',
                description: error.data.message,
                variant: 'destructive'
            })
        },
    })

    const debouncedSubmit = React.useCallback(
        debounce(useUpdateContent.mutate, 500), // Adjust the delay (500ms in this case) as needed
        []
    );

    const onSubmit = (e) => {
        console.log('On Change Update')
        e.preventDefault();
    };

    const handleToggle = async (checked: boolean) => {
        if (value.id) {
            setEnabled(checked)
            await linkServices.updateToggle(value.id, checked);
        }
    }

    const handleThumbnailUpload = async (file: File) => {
        await useUploadThumbnail.mutate(file);
    }


    return (
        <Card className={'flex min-h-[100px] h-[100px] py-0'}>
            <CardContent className={'flex w-full py-0 pl-0'}>
                <div {...handle}
                     className={'flex items-center justify-center h-full min-w-9 text-foreground-secondary hover:text-foreground cursor-pointer transition-all'}>
                    <MaterialSymbolsDragIndicator className={'text-2xl'}/>
                </div>

                <div className={'flex items-center h-full w-full gap-2.5'}>
                    <LinkThumbnailUploader loading={useUploadThumbnail.isPending} image={value.thumbnail_url}
                                           title={value.title}
                                           onImageUpload={handleThumbnailUpload}/>

                    <form onChange={onSubmit} className={'flex flex-col w-full pr-4'}>
                        <LinkInputField control={control} name={'title'} as={'div'} foreground={'primary'}
                                        variant={'large'}/>
                        <LinkInputField control={control} name={'url'} as={'div'} foreground={'primary'}
                                        variant={'subtitle'}/>
                    </form>
                </div>

                <div className={'flex flex-col items-center justify-center h-full gap-y-1'}>
                    <Switch checked={isEnabled} onCheckedChange={handleToggle}/>
                    <IconButton size={'lg'} className={'text-foreground-secondary'} onClick={() => onDelete(index)}>
                        <IcOutlineDeleteOutline/>
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    )
        ;
}

export default LinkMainCard;
