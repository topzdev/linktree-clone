"use client"

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import useAppAuth from "@/hooks/useAppAuth";
import {GoogleLogoIcon} from "@/components/icons/GoogleLogoIcon";

type Props = {
    children?: React.ReactNode
}

const GoogleLoginButton = (props: Props) => {
    const {oauthLogin} = useAppAuth();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        await oauthLogin('google');
        setLoading(false);

    }

    return <Button
        size={'lg'}
        rounded
        color={'accent'}
        variant={'outlined'}
        loading={loading}
        disabled={loading}
        iconLeft={
            <GoogleLogoIcon/>
        }
        onClick={handleSubmit}>
        Continue with Google
    </Button>

}

export default GoogleLoginButton;