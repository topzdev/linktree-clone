import React from "react";
import AppearancePageToggler from "@/app/dashboard/(main)/appearance/_components/AppearancePageToggler";

type Props = {
    children?: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <>
            <AppearancePageToggler />
            {props.children}
        </>
    );
};

export default Layout;
