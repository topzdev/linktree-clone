import Image from "next/image";
import Link from "@/components/ui/link";

export default async function AuthLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Link className={'top-16 left-1/2 -translate-x-1/2 absolute '} href={'/'}>
            <Image height={30} width={145} src={'/logo.svg'} alt={'Linktree'}/>
        </Link>
        {children}
    </>
}
