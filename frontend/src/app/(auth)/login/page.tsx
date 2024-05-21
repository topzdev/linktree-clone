'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import {FormInput} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Credentials} from '@/lib/auth';
import useAppAuth from '@/hooks/useAppAuth';
import {toast} from '@/components/ui/use-toast';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import Typography from '@/components/ui/typography';
import Link from '@/components/ui/link';

type Props = {
    children?: React.ReactNode;
};

const Page = (props: Props) => {
    const {login} = useAppAuth();
    const {register, control, handleSubmit, formState} = useForm<Credentials>({
        defaultValues: {
            password: '2559069dev',
            email: 'christianlugod05@gmail.com',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await login(data);
        } catch (e: any) {
            console.log(e);
            toast({
                title: 'Login Error',
                description: e?.message,
                variant: 'destructive',
            });
        }
    });

    return (
        <div className='container flex items-center justify-center h-screen'>
            <div className='grid w-full max-w-sm items-center gap-1.5 mx-auto'>
                <Typography
                    className={'text-center'}
                    variant='h2'
                    as='h2'
                >
                    Welcome Back
                </Typography>
                <Typography
                    foreground='secondary'
                    className={'text-center'}
                    variant='p'
                    as='p'
                >
                    Login in to Linktree
                </Typography>

                <form
                    className={'flex flex-col gap-y-3 mt-2'}
                    onSubmit={onSubmit}
                >
                    <FormInput
                        control={control}
                        name={'email'}
                        label={'Email'}
                        id='email'
                        type='email'
                        placeholder='Email'
                    />
                    <FormInput
                        control={control}
                        name={'password'}
                        label='Password'
                        id='email'
                        type='password'
                        placeholder='Password'
                    />
                    <Button
                        size={'lg'}
                        rounded
                        loading={formState.isSubmitting}
                        disabled={formState.isSubmitting}
                        type={'submit'}
                    >
                        Login
                    </Button>
                </form>

                <Typography
                    className={'text-center uppercase my-4'}
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
                    Don't have an account{' '}
                    <Link
                        className='text-blue-500 underline'
                        href={'/register'}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Page;
