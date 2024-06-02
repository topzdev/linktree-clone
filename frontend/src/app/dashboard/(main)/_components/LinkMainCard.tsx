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

type Props = {
    children?: React.ReactNode,
    update: UseFieldArrayUpdate<LinksForm>,
    index: number,
    value: FieldArrayWithId<LinksForm, "links", "_id">,
    handle: any
    onDelete: (index: number) => void
}

const LinkMainCard = ({value, index, handle, onDelete}: Props) => {
    const [isEnabled, setEnabled] = useState(value.is_enabled);

    const {
        control,
        handleSubmit,
        watch,
        formState, formState: {isValidating}
    } = useForm<LinkForm>({
        resolver: yupResolver(linkSchema),
        mode: 'onBlur',
        defaultValues: value
    });

    const debouncedSubmit = React.useCallback(
        debounce(async (data: LinkForm) => {
            if (value.id) {
                await linkServices.update(value.id, {
                    url: data.url,
                    title: data.title
                })
            }
        }, 500), // Adjust the delay (500ms in this case) as needed
        []
    );

    const data = watch();

    React.useEffect(() => {
        if (formState.isValid && !isValidating) {
            debouncedSubmit(data);
        }
    }, [formState, data, isValidating]);

    const onSubmit = (values: LinkForm) => {
        debouncedSubmit(values);
    };

    const handleToggle = async (checked: boolean) => {
        if (value.id) {
            setEnabled(checked)
            await linkServices.updateToggle(value.id, checked);
        }
    }


    return (
        <Card className={'flex min-h-[100px] h-[100px] py-0'}>
            <CardContent className={'flex w-full py-0 pl-0'}>
                <div {...handle}
                     className={'flex items-center justify-center h-full min-w-9 text-foreground-secondary hover:text-foreground cursor-pointer transition-all'}>
                    <MaterialSymbolsDragIndicator className={'text-2xl'}/>
                </div>

                <div className={'flex items-center h-full w-full gap-2.5'}>
                    <LinkThumbnailUploader image={value.thumbnail_url} title={value.title}/>

                    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col w-full pr-4'}>
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
