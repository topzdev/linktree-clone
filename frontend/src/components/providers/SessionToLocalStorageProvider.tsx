"use client"

import React from "react";
import useSessionToLocalStorage from "@/hooks/useSessionToLocalStorage";

type Props = {
    children?: React.ReactNode
}

const SessionToLocalStorageProvider = (props: Props) => {
    useSessionToLocalStorage();

    return <>
        {props.children}
    </>
}

export default SessionToLocalStorageProvider;