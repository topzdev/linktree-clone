import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { FormInput, InputSkeleton } from "@/components/ui/input";
import { TextareaSkeleton } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileStyleChooserSkeleton } from "@/app/dashboard/(main)/profile/_components/ProfileStyleChooser";
import useAppAuth from "@/hooks/useAppAuth";
import { AuthUser } from "../../../../../../../types/next-auth";
import accountServices from "@/services/account";
import { usernameFieldSchema } from "@/configs/shared-schema";

type Props = {
    children?: React.ReactNode;
    value: AuthUser;
};

const myAccountSchema = yup.object().shape({
    username: usernameFieldSchema.label("Username"),
    firstname: yup.string().required().label("First Name"),
    lastname: yup.string().required().label("Last Name"),
    email: yup.string().email().required().label("Email Address"),
});

export type MyAccountForm = yup.InferType<typeof myAccountSchema>;
const MyAccountForm = ({ value }: Props) => {
    const { update } = useAppAuth();
    const { toast } = useToast();

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: {
            isSubmitSuccessful,
            isLoading,
            isSubmitting,
            isValid,
            isDirty,
        },
    } = useForm<MyAccountForm>({
        defaultValues: {
            username: value.username,
            lastname: value.lastname,
            firstname: value.firstname,
            email: value.email,
        },
        resolver: yupResolver(myAccountSchema),
    });

    const useUpdateContent = useMutation({
        mutationFn: async (data: MyAccountForm) => {
            await accountServices.changeInfo(data);
        },
        onSuccess: async (data, variables, context) => {
            await update();

            toast({
                title: "My Account",
                description: "Account Information Updated",
                variant: "success",
            });
        },
        onError(error: FetchError, variables, context) {
            const errors = error.data.errors;
            console.log("Error", errors, Object.keys(errors));
            Object.keys(errors).forEach((key) => {
                console.log("Error." + key, errors[key][0]);
                setError(
                    key,
                    {
                        message: errors[key][0],
                    },
                    {
                        shouldFocus: true,
                    },
                );
            });

            toast({
                title: "Something went wrong",
                description: error.data.message,
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (data: MyAccountForm) => {
        await useUpdateContent.mutate(data);
    };

    return (
        <Card>
            <CardContent className={"flex flex-col gap-y-4"}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={"grid grid-cols-12 gap-4"}
                >
                    <div className="col-span-12">
                        <FormInput
                            control={control}
                            name={"username"}
                            label={"Username"}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            control={control}
                            name={"firstname"}
                            label={"First name"}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            control={control}
                            name={"lastname"}
                            label={"Last name"}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            control={control}
                            name={"email"}
                            label={"Email Address"}
                        />
                    </div>
                    <div className="col-span-12 flex justify-end">
                        <Button
                            disabled={
                                !isDirty ||
                                !isValid ||
                                useUpdateContent.isPending
                            }
                            loading={useUpdateContent.isPending}
                            type={"submit"}
                            size={"lg"}
                            className={"w-[150px]"}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export const MyAccountFormSkeleton = () => {
    return (
        <Card>
            <CardContent
                className={"flex flex-col items-center justify-center gap-y-4"}
            >
                <Skeleton className="h-[144px] w-[144px] rounded-full" />
                <div className={"flex w-full gap-x-5 max-md:flex-col"}>
                    <ButtonSkeleton className={"w-full"} size={"lg"} />
                    <ButtonSkeleton className={"w-full"} size={"lg"} />
                </div>
                <ProfileStyleChooserSkeleton />
                <InputSkeleton />
                <TextareaSkeleton />
            </CardContent>
        </Card>
    );
};

export default MyAccountForm;
