import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import useAppAuth from "@/hooks/useAppAuth";
import { AuthUser } from "../../../../../../../types/next-auth";
import accountServices from "@/services/account";
import { passwordFieldSchema } from "@/configs/shared-schema";

type Props = {
    children?: React.ReactNode;
    value: AuthUser;
};

const changePasswordSchema = yup.object().shape({
    password: yup.string().required().label("Current Password"),
    new_password: passwordFieldSchema.label("New Password"),
    new_password_confirmation: yup
        .string()
        .oneOf([yup.ref("new_password"), ""], "Passwords must match")
        .required("New Password confirmation is required"),
});

export type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>;
const ChangePasswordForm = ({ value }: Props) => {
    const { update } = useAppAuth();
    const { toast } = useToast();

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { isValid, isDirty },
    } = useForm<ChangePasswordForm>({
        mode: "onChange",
        defaultValues: {
            password: "",
            new_password: "",
            new_password_confirmation: "",
        },
        resolver: yupResolver(changePasswordSchema),
    });

    const useUpdateContent = useMutation({
        mutationFn: async (data: ChangePasswordForm) => {
            await accountServices.changePassword(data);
        },
        onSuccess: async (data, variables, context) => {
            await update();

            toast({
                title: "Change Password",
                description: "Password Successfully Updated",
                variant: "success",
            });

            reset();
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

    const onSubmit = async (data: ChangePasswordForm) => {
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
                            type={"password"}
                            control={control}
                            name={"password"}
                            label={"Current Password"}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            type={"password"}
                            control={control}
                            name={"new_password"}
                            label={"New Password"}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            type={"password"}
                            control={control}
                            name={"new_password_confirmation"}
                            label={"Confirm Password"}
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
export default ChangePasswordForm;
