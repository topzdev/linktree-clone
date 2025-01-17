"use client"

import React, {useEffect} from "react";
import {Link} from "../../../../../../types/models";
import LinkMainCard, {LinkMainCardSkeleton} from "@/app/dashboard/(main)/_components/links/LinkMainCard";
import {useFieldArray, useForm} from "react-hook-form";
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import * as yup from "yup"
import linkServices from "@/services/links";
import useDashboardStore from "@/stores/dashboard";

type Props = {
    children?: React.ReactNode,
    links: Link[]
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>

export const linkSchema = yup.object().shape({
    id: yup.number(),
    url: yup.string().url().nullable(),
    title: yup.string().max(44).min(0).required().nullable(),
    type: yup.number().nullable(),
    is_enabled: yup.boolean(),
    thumbnail_url: yup.string().nullable(),
});

export type LinkForm = yup.InferType<typeof linkSchema>

const linksSchema = yup.object({
    links: yup.array().of(linkSchema)
})

export type LinksForm = yup.InferType<typeof linksSchema>;

const LinksList = ({links}: Props) => {
    const updatePreview = useDashboardStore(state => state.updatePreview);
    const {control, reset, register} = useForm<LinksForm>({
        defaultValues: {
            links
        }
    });

    useEffect(() => {
        reset({
            links
        });
    }, [links]);

    const {fields, update, move, append, remove} = useFieldArray({
        keyName: '_id',
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "links", // unique name for your Field Array
    });

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        move(result.source.index, result.destination.index);

        const reorderedItems = Array.from(fields);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        const reorderedLinks = reorderedItems.map((item) => item.id)

        await linkServices.updatePositions(reorderedLinks as number[]);
        updatePreview()
    };

    const handleDelete = async (index: number) => {
        const id = fields[index].id;
        if (fields && fields[index] && fields[index].id) {
            remove(index);
            await linkServices.delete(id?.toString() as string);
            updatePreview()
        }
    }

    return <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
            {(provided: any) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className={'flex flex-col'}>
                    {fields.map((item, index) => (
                        <Draggable key={item.id} draggableId={item._id} index={index}>
                            {(provided: any) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={'pb-2.5'}
                                >
                                    <LinkMainCard
                                        handle={provided.dragHandleProps}
                                        index={index}
                                        value={item}
                                        update={update}
                                        onDelete={handleDelete}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    </DragDropContext>

}

export const LinkListSkeleton = () => {
    return <div className={'flex flex-col gap-y-2.5'}>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
        <LinkMainCardSkeleton/>
    </div>
}

export default LinksList;