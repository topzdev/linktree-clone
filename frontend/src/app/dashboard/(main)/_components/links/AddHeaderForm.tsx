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
export const headerSchema  = yup.object().shape({
    title: yup.string().max(44).min(0).required().nullable(),
});

export type AddHeaderForm = yup.InferType<typeof headerSchema>
const AddHeaderForm = ({onAdd, loading}: Props) => {
    const {handleSubmit, control} = useForm<AddHeaderForm>({
        resolver: yupResolver(headerSchema),
        defaultValues: {
            title: ''
        },
    })

    const onSumbit = handleSubmit((value) => {
        onAdd({
            title: value.title || '',
            url: '',
            type: '2',
        })
    })

    return <form onSubmit={onSumbit} className={'flex max-sm:flex-col items-stretch w-full gap-2.5'}>
        <FormInput disabled={loading} control={control} name={'title'} placeholder={'Enter header here'} className="w-full"/>
        <Button disabled={loading} loading={loading} type={'submit'} className={'h-auto px-8 h-[52px]'} size={'lg'} rounded>Add</Button>
    </form>
}

export default AddHeaderForm;