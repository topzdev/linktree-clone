import React from "react";
import ReactQueryProviders from "@/components/providers/ReactQueryProvider";
import SessionToLocalStorageProvider from "@/components/providers/SessionToLocalStorageProvider";

type Props = {
    children?: React.ReactNode
}

const Providers = async ({children}: Props) => {
    return <ReactQueryProviders>
        <SessionToLocalStorageProvider>
            {children}
        </SessionToLocalStorageProvider>
    </ReactQueryProviders>


}

export default Providers;