import React from "react";
import ReactQueryProviders from "@/components/providers/ReactQueryProvider";
import SessionToLocalStorageProvider from "@/components/providers/SessionToLocalStorageProvider";
import { ThemeProvider } from "next-themes";
import { AlertDialogProvider } from "@/components/providers/AlertDialogProvider";

type Props = {
    children?: React.ReactNode;
};

const Providers = async ({ children }: Props) => {
    return (
        <ReactQueryProviders>
            <SessionToLocalStorageProvider>
                <ThemeProvider attribute="class">{children}</ThemeProvider>
            </SessionToLocalStorageProvider>
        </ReactQueryProviders>
    );
};

export default Providers;
