"use client"

import React from "react";
import {useForm} from "react-hook-form";
import {FormInput} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useAppAuth from "@/hooks/useAppAuth";
import {toast} from "@/components/ui/use-toast";
import Typography from "@/components/ui/typography";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import Link from "@/components/ui/link";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";

type Props = {
    children?: React.ReactNode
}

const schema = yup.object({
    firstname: yup.string().required().label('First Name'),
    lastname: yup.string().required().label('Last name'),
    username: yup.string().required().matches(/^[a-zA-Z][a-zA-Z0-9_\.]{2,19}$/, "Username must start with a letter and can contain letters, numbers, underscores, and dots.")
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username cannot be longer than 20 characters.").label('Username'),
    email: yup.string().required().email().label('Email'),
    password: yup.string().required()
        .min(8, 'Password must be at least 8 characters long').label('Password')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required')
})

export type RegisterInfo = yup.InferType<typeof schema>;

const Page = (props: Props) => {
    const {register: authRegister} = useAppAuth();
    const {control, formState, handleSubmit} = useForm<RegisterInfo>({
        mode: 'all',
        resolver: yupResolver(schema),
        defaultValues: {
            firstname: 'Christopher',
            lastname: 'Lastname',
            username: 'topzdev',
            email: 'christianlugod05@gmail.com',
            password: '123456789@Dev',
            password_confirmation: '123456789@Dev',
        },
    });

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
            })
        }
    });

    return <div className='container flex items-center justify-center pt-[150px] pb-10'>
        <div className='grid w-full max-w-sm items-center gap-6 mx-auto'>
            <div className={'flex flex-col gap-y-1'}>
                <Typography
                    className={'text-center'}
                    variant='h2'
                    as='h2'
                >
                    Welcome!
                </Typography>
                <Typography
                    foreground='secondary'
                    className={'text-center'}
                    variant='p'
                    as='p'
                >
                    Sign up for Linktree Account
                </Typography>
            </div>

            <form
                className={'flex flex-col gap-y-4 mt-2'}
                onSubmit={onSubmit}
            >
                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        control={control}
                        name={'firstname'}
                        label={'First Name'}
                        id='firstname'
                        placeholder='Enter firstname here'
                    />

                    <FormInput
                        control={control}
                        name={'lastname'}
                        label={'Last Name'}
                        id='lastname'
                        placeholder='Enter lastname here'
                    />
                </div>

                <FormInput
                    control={control}
                    name={'username'}
                    label={'Username'}
                    id='username'
                    placeholder='Enter username here'
                />
                <FormInput
                    control={control}
                    name={'email'}
                    label={'Email'}
                    id='email'
                    type='email'
                    placeholder='Enter email here'
                />
                <FormInput
                    control={control}
                    name={'password'}
                    label='Password'
                    id='password'
                    type='password'
                    placeholder='Enter password here'
                />
                <FormInput
                    control={control}
                    name={'password_confirmation'}
                    label='Confirm Password'
                    id='password_confirmation'
                    type='password'
                    placeholder='Enter password here'
                />
                <Button
                    size={'lg'}
                    rounded
                    loading={formState.isSubmitting}
                    disabled={formState.isSubmitting}
                    type={'submit'}
                >
                    Sign Up
                </Button>
            </form>

            <Typography
                className={'text-center uppercase'}
                foreground='secondary'
                variant='p'
                as='p'
            >
                or
            </Typography>

            <div className={'flex flex-col gap-y-2'}>
                <GoogleLoginButton/>
            </div>

            <Typography
                className={'text-center my-4'}
                foreground='secondary'
                variant='p'
                as='p'
            >
                Already have an account?{' '}
                <Link
                    className='text-blue-500 underline'
                    href={'/login'}
                >
                    Sign In
                </Link>
            </Typography>
        </div>
    </div>

}

export default Page;