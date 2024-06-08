import React, {useState} from "react";
import MaterialSymbolsDragIndicator from "@/components/icons/MaterialSymbolsDragIndicator";
import {Card, CardContent} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {IconButton} from "@/components/ui/icon-button";
import IcOutlineDeleteOutline from "@/components/icons/IcOutlineDeleteOutline";
import {FieldArrayWithId, UseFieldArrayUpdate} from "react-hook-form";
import {LinkForm, LinksForm} from "@/app/dashboard/(main)/_components/links/LinksList";
import debounce from "debounce";
import linkServices from "@/services/links";
import {useToast} from "@/components/ui/use-toast";
import {FetchError} from "ofetch";
import {useMutation} from "@tanstack/react-query";
import * as yup from "yup";
import {Skeleton} from "@/components/ui/skeleton";
import LinkMainUrlForm from "@/app/dashboard/(main)/_components/links/LinkMainUrlForm";
import LinkMainHeaderForm from "@/app/dashboard/(main)/_components/links/LinkMainHeaderForm";
import useDashboardStore from "@/stores/dashboard";

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
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {toast} = useToast()
    const [isEnabled, setEnabled] = useState(value.is_enabled);


    const useUpdateContent = useMutation({
        mutationFn: (data: LinkForm) => {
            return linkServices.update(value.id, {
                url: data.url,
                title: data.title
            })
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

    const handleToggle = async (checked: boolean) => {
        if (value.id) {
            setEnabled(checked)
            updatePreview();
            await linkServices.updateToggle(value.id, checked);
        }
    }

    const onUpdateContent = debounce(async (data: LinkForm) => {
        await useUpdateContent.mutate(data);
    }, 2000)

    return (
        <Card className={'flex h-[90px] min-h-[90px] md:min-h-[100px] md:h-[100px] py-0'}>
            <CardContent className={'flex w-full py-0 pl-0 pr-3'}>
                <div {...handle}
                     className={'flex items-center justify-center h-full min-w-9 text-foreground-secondary hover:text-foreground cursor-pointer transition-all'}>
                    <MaterialSymbolsDragIndicator className={'text-2xl'}/>
                </div>

                <div className={'flex items-center h-full w-full gap-2.5'}>
                    {value.type === 1 && <LinkMainUrlForm update={onUpdateContent} value={value}/>}
                    {value.type === 2 && <LinkMainHeaderForm update={onUpdateContent} value={value}/>}
                </div>

                <div className={'flex flex-col items-center justify-center h-full gap-y-1'}>
                    <Switch checked={isEnabled} onCheckedChange={handleToggle}/>
                    <IconButton size={'lg'} className={'text-foreground-secondary h-[35px] w-[35px]'} onClick={() => onDelete(index)}>
                        <IcOutlineDeleteOutline/>
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    )
        ;
}

export const LinkMainCardSkeleton = () => {
    return <Card className={'flex min-h-[90px] h-[90px] md:min-h-[100px] md:h-[100px] py-0'}>
        <CardContent className={'flex items-center w-full pl-0 p-2 py-4 md::py-5 gap-x-3'}>
            <Skeleton className="h-10 min-w-5 rounded-lg"/>
            <Skeleton className="h-12 min-w-12 md:h-16 md:min-w-16 rounded-lg"/>
            <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="h-5 w-6/12"/>
                <Skeleton className="h-4 w-8/12"/>
            </div>
        </CardContent>
    </Card>
}

export default LinkMainCard;
