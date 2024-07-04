import React from "react";
import { Button, Link } from "../../../../../types/models";
import LinkMainCard from "@/app/(public)/[username]/_components/link/LinkMainCard";
import LinkHeaderCard from "@/app/(public)/[username]/_components/link/LinkHeaderCard";

type Props = {
    children?: React.ReactNode;
    links: Link[];
    button?: Button;
};

const LinkListContainer = ({ links, button }: Props) => {
    return (
        <div className={"flex w-full flex-col gap-y-4 md:gap-y-4"}>
            {links.map((item) => {
                switch (item.type) {
                    case 1:
                        return (
                            <LinkMainCard
                                buttonType={button?.key || "fill"}
                                key={`link-item-` + item.id}
                                data={item}
                            />
                        );
                    case 2:
                        return (
                            <LinkHeaderCard
                                key={`link-item-` + item.id}
                                data={item}
                            />
                        );
                }
            })}
        </div>
    );
};

export default LinkListContainer;
