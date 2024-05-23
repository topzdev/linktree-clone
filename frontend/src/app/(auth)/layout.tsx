import Image from "next/image";
import Link from "@/components/ui/link";

export default async function AuthLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <div className={'flex justify-center py-14 absolute top-0 left-0 w-full'}>
            <Link className={''} href={'/'}>
                <Image height={30} width={145} src={'/logo.svg'} alt={'Linktree'}/>
            </Link>
        </div>
        {children}
    </>
}
