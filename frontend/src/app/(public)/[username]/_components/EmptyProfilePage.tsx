"use client";

import Typography from "@/components/ui/typography";
import AppHeader from "@/app/(guest)/_components/AppHeader";

type Props = {};
const EmptyProfilePage = (props: Props) => {
    return (
        <div className={"container h-screen flex items-center justify-center"}>
            <AppHeader />
            <Typography variant={"h2"}>Profile Not Found</Typography>
        </div>
    );
};
export default EmptyProfilePage;
