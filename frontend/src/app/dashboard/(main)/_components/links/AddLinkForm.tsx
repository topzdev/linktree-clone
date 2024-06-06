import React from "react";
import {FormInput, Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddLink} from "@/services/links";

type Props = {
    children?: React.ReactNode,
    onAdd: (data: AddLink) => void;
    loading?: boolean,
}
export const linkSchema  = yup.object().shape({
    url: yup.string().url().required().label('URL'),
});

export type AddLinkForm = yup.InferType<typeof linkSchema>
const AddLinkForm = ({onAdd, loading}: Props) => {
    const {handleSubmit, control, formState} = useForm<AddLinkForm>({
        resolver: yupResolver(linkSchema),
        defaultValues: {
            url: ''
        },
    })

    const onSumbit = handleSubmit((value) => {
        onAdd({
            title: '',
            url: value.url || '',
            type: '1',
        })
    })

    return <form onSubmit={onSumbit} className={'flex  max-sm:flex-col items-stretch w-full gap-2.5'}>
        <FormInput disabled={loading} control={control} name={'url'} placeholder={'Enter URL here'} className="w-full"/>
        <Button disabled={loading} loading={loading} type={'submit'} className={'px-8 h-[52px]'} size={'lg'} rounded>Add</Button>
    </form>
}

export default AddLinkForm;