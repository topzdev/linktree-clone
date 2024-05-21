"use client"

import React from "react";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Credentials, login} from "@/lib/auth";
import useAppAuth from "@/hooks/useAppAuth";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import FacebookLoginButton from "@/components/auth/FacebookLoginButton";
import Typography from "@/components/ui/typography";
import Link from "@/components/ui/link";



type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    const {login} = useAppAuth();
    const {register, handleSubmit, formState} = useForm<Credentials>({
        defaultValues: {
            password: '2559069dev',
            email: 'christianlugod05@gmail.com'
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await login(data);
        } catch (e: any) {
            console.log(e);
            toast({
                title: "Login Error",
                description: e?.message,
                variant: "destructive",
            })
        }
    });


    return <div className="container flex items-center justify-center h-screen">
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">

            <Typography className={'text-center'} variant="h2" as="h2">Welcome Back</Typography>
            <Typography foreground="secondary" className={'text-center'} variant="p" as="p">Login in to Linktree</Typography>

            <form className={'flex flex-col gap-y-3 mt-2'} onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input  {...register('email')} id="email" type="email" placeholder="Email"/>
                </div>
                <div>
                    <Label htmlFor="email">Password</Label>
                    <Input   {...register('password')} id="email" type="password" placeholder="Password"/>
                </div>
                <Button size={'lg'} rounded loading={formState.isSubmitting} disabled={formState.isSubmitting}
                        type={'submit'}>Login</Button>

            </form>

            <Typography className={'text-center uppercase my-4'} foreground="secondary" variant="p" as="p">or</Typography>
            
            <div className={'flex flex-col gap-y-2'}>
                <GoogleLoginButton/>
            </div>

            <Typography className={'text-center my-4'} foreground="secondary" variant="p" as="p">
                Don't have an account <Link className="text-blue-500 underline" href={'/register'}>Sign Up</Link>
            </Typography>

        </div>

    </div>
}

export default Page;