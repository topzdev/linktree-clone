import React, { useEffect } from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import useDashboardStore from "@/stores/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import socialsServices, { UserSocials } from "@/services/socials";
import { Social } from "../../../../../../types/models";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import Typography, { TypographySkeleton } from "@/components/ui/typography";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import SocialItem from "@/app/dashboard/(main)/settings/_components/SocialItem";
import Link from "next/link";
import pageRoutes from "@/configs/page-routes";
import List, { ListItemSkeleton } from "@/components/ui/list";
import AutoSave from "@/components/utils/AutoSave";

type Props = {
    children?: React.ReactNode;
    value: UserSocials;
};

export type SocialListForm = {
    socials?: Social[];
};

const SocialListForm = ({ value }: Props) => {
    const updatePreview = useDashboardStore((state) => state.updatePreview);
    const { toast } = useToast();
    const methods = useForm<SocialListForm>({
        defaultValues: {
            ...value,
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState,
        getValues,
        trigger,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        reset({
            ...value,
        });
    }, [value, reset]);

    const { fields, update, move, append, remove } = useFieldArray({
        keyName: "_id",
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "socials", // unique name for your Field Array
    });

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        move(result.source.index, result.destination.index);

        const reorderedItems = Array.from(fields);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        const reorderedSocials = reorderedItems.map((item) => item.id);

        console.log(reorderedSocials);
        await socialsServices.updatePositions(reorderedSocials as number[]);
        updatePreview();
    };

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateVisibility = useMutation({
        mutationFn: (id: number) => {
            return socialsServices.updateVisibility(id);
        },
        onSuccess(data, variables, context) {
            updatePreview();
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: "Something went wrong",
                description: error.data.message,
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (data: SocialListForm) => {
        setSubmittedData(data);
    };

    return (
        <>
            <CardHeader
                className={"max-md:flex-col max-md:gap-y-3 !pb-0"}
                action={
                    <Link
                        href={pageRoutes.dashboard.settings.socials.list.href}
                    >
                        <Button className={"w-full"} rounded size={"lg"}>
                            Add Social
                        </Button>
                    </Link>
                }
            >
                <Typography variant="h4">Link your social media</Typography>
                <Typography
                    variant="p-ui"
                    className={"mt-2"}
                    foreground="secondary"
                >
                    Add and edit icons linking to your social profiles, email
                    and more. Reorder icons by drag and drop.
                </Typography>
            </CardHeader>
            <CardContent className={"flex flex-col gap-y-4"}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={"flex gap-y-4"}
                    >
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="items">
                                {(provided: any) => (
                                    <List
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={"flex flex-col w-full"}
                                    >
                                        {fields.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item._id}
                                                index={index}
                                            >
                                                {(provided: any) => (
                                                    <SocialItem
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        updateVisibility={
                                                            useUpdateVisibility.mutate
                                                        }
                                                        handle={
                                                            provided.dragHandleProps
                                                        }
                                                        data={item}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </List>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <AutoSave defaultValues={value} onSubmit={onSubmit} />
                    </form>
                </FormProvider>
            </CardContent>
        </>
    );
};

export const SocialListFormSkeleton = () => {
    return (
        <CardContent
            className={
                "flex flex-col justify-center items-center gap-y-4 w-full"
            }
        >
            <div className="flex max-md:flex-col gap-4 mb-4">
                <div className={"flex flex-col items-start gap-y-2.5"}>
                    <TypographySkeleton>
                        Link your social media
                    </TypographySkeleton>
                    <TypographySkeleton>
                        Add and edit icons linking to your social profiles,
                        email and more. Reorder icons by drag and drop.
                    </TypographySkeleton>
                </div>
                <ButtonSkeleton className={"min-w-[150px]"} />
            </div>

            <List className={"w-full gap-y-2"}>
                <ListItemSkeleton />
                <ListItemSkeleton />
                <ListItemSkeleton />
                <ListItemSkeleton />
            </List>
        </CardContent>
    );
};

export default SocialListForm;
