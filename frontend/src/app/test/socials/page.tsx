import React from "react";
import socialIcons from "@/data/social-icons";

type Props = {
    children?: React.ReactNode
}


const Page = (props: Props) => {
    return <div className="container py-10 grid grid-cols-6">
        {socialIcons.map(item =>
            <div className={'flex flex-col justify-center'}>
                {item.icon && <div className={'text-primary h-10 w-10'} dangerouslySetInnerHTML={{
                    __html: item.icon
                }}></div>
                }
                <p>{item.title}</p>
            </div>
        )}

    </div>
}

export default Page;