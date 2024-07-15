"use client";

import { FormInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import useAppAuth from "@/hooks/useAppAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/components/ui/use-toast";
import { RegisterInfo } from "@/app/(guest)/register/page";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";

type Props = {};

const schema = yup.object({
    firstname: yup.string().required().label("First Name"),
    lastname: yup.string().required().label("Last name"),
    username: yup
        .string()
        .required()
        .matches(
            /^[a-zA-Z][a-zA-Z0-9_\.]{2,19}$/,
            "Username must start with a letter and can contain letters, numbers, underscores, and dots.",
        )
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username cannot be longer than 20 characters.")
        .label("Username"),
    email: yup.string().required().email().label("Email"),
    password: yup
        .string()
        .required()
        .min(8, "Password must be at least 8 characters long")
        .label("Password")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[@$!%*?&]/,
            "Password must contain at least one special character",
        ),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Passwords must match")
        .required("Password confirmation is required"),
});

export type RegisterInfo = yup.InferType<typeof schema>;
const RegisterForm = (props: Props) => {
    const { register: authRegister } = useAppAuth();
    const searchParams = useSearchParams();

    const { control, formState, setValue, handleSubmit } =
        useForm<RegisterInfo>({
            mode: "all",
            resolver: yupResolver(schema),
            defaultValues: {
                /*   firstname: "Christopher",
lastname: "Lastname",
username: "topzdev",
email: "christianlugod05@gmail.com",
password: "123456789@Dev",
password_confirmation: "123456789@Dev",*/
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        });

    useEffect(() => {
        if (searchParams.get("u")) {
            setValue("username", searchParams.get("u"));
        }
    }, [searchParams]);

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        try {
            const response = await authRegister(data);
        } catch (e: any) {
            console.log(e);
            toast({
                title: "Register Error",
                description: e?.message,
                variant: "destructive",
            });
        }
    });

    return (
        <form className={"mt-2 flex flex-col gap-y-4"} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    control={control}
                    name={"firstname"}
                    label={"First Name"}
                    id="firstname"
                />

                <FormInput
                    control={control}
                    name={"lastname"}
                    label={"Last Name"}
                    id="lastname"
                />
            </div>

            <FormInput
                control={control}
                name={"username"}
                label={"Username"}
                id="username"
            />
            <FormInput
                control={control}
                name={"email"}
                label={"Email"}
                id="email"
                type="email"
            />
            <FormInput
                control={control}
                name={"password"}
                label="Password"
                id="password"
                type="password"
            />
            <FormInput
                control={control}
                name={"password_confirmation"}
                label="Confirm Password"
                id="password_confirmation"
                type="password"
            />
            <Button
                size={"lg"}
                rounded
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
                type={"submit"}
            >
                Sign Up
            </Button>
        </form>
    );
};
export default RegisterForm;
