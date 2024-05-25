import Image from "next/image";
import Link from "@/components/ui/link";
import AppLogo from "@/components/common/AppLogo";

export default async function AuthLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <div className={'flex justify-center py-14 absolute top-0 left-0 w-full'}>
            <AppLogo/>
        </div>
        {children}
    </>
}
