import React from "react";
import Link from "@/components/ui/link";
import Image from "next/image";

type Props = {
    children?: React.ReactNode
}

const AppLogo = (props: Props) => {
    return <Link className={''} href={'/'}>
        <Image height={30} width={145} src={'/logo.svg'} alt={'Linktree'}/>
    </Link>

}

export default AppLogo;