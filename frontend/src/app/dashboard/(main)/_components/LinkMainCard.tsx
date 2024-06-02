"use client"

import React from "react";
import MaterialSymbolsDragIndicator from "@/components/icons/MaterialSymbolsDragIndicator";
import {Card, CardContent} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import LinkThumbnailUploader from "@/app/dashboard/(main)/_components/cards/LinkThumbnailUploader";
import {Switch} from "@/components/ui/switch";
import {IconButton} from "@/components/ui/icon-button";
import IcOutlineDeleteOutline from "@/components/icons/IcOutlineDeleteOutline";
import {Control, FieldArrayWithId, UseFieldArrayUpdate, useForm} from "react-hook-form";
import {LinkForm, LinksForm} from "@/app/dashboard/(main)/_components/LinksList";

type Props = {
    children?: React.ReactNode,
    update: UseFieldArrayUpdate<LinksForm>,
    index: number,
    value: FieldArrayWithId<LinksForm, "links", "_id">,
    control: Control<LinksForm>
    handle: any
    onDelete: (index: number) => void
}

const LinkMainCard = ({value, index, control, handle, onDelete}: Props) => {
    const {register, handleSubmit} = useForm<LinkForm>({
        defaultValues: value
    });

    return <Card className={'flex min-h-[100px] h-[100px] py-0'}>
        <CardContent className={'flex w-full py-0 pl-0'}>
            <div {...handle}
                className={'flex items-center justify-center h-full min-w-9 text-foreground-secondary hover:text-foreground cursor-pointer transition-all'}>
                <MaterialSymbolsDragIndicator className={'text-2xl'}/>
                {value.id}
            </div>

            <div className={'flex items-center h-full w-full gap-2.5'}>
                <LinkThumbnailUploader image={value.thumbnail_url} title={value.title}/>
                <div className={'flex flex-col'}>
                    <Typography as={'div'} foreground={'primary'} variant={'large'}>
                        <input placeholder={'Enter title here'} className={"placeholder:text-foreground-secondary !outline-0"} {...register('title')} autoComplete={'off'}/>
                    </Typography>
                    <Typography as={'div'} foreground={'primary'} variant={'subtitle'}>
                        <input placeholder={'Enter url here'} className={'placeholder:text-foreground-secondary !outline-0'} {...register(`url`)} autoComplete={'off'}/>
                    </Typography>
                </div>
            </div>

            <div className={'flex flex-col items-center justify-center h-full'}>
                <Switch/>
                <IconButton size={'lg'} className={'text-foreground-secondary'} onClick={() => onDelete(index)}>
                    <IcOutlineDeleteOutline/>
                </IconButton>
            </div>
        </CardContent>
    </Card>
}

export default LinkMainCard;