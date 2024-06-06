import useDashboardStore from "@/stores/dashboard";
import {Card, CardContent} from "@/components/ui/card";
import React from "react";
import AddLinkMainForm from "@/app/dashboard/(main)/_components/links/AddLinkHeaderForm";

const AddLinkMainFormCard = () => {
    const type = useDashboardStore(state => state.type);

    return ( type !== '0' ? <Card>
            <CardContent className={'pt-4'}>
                <AddLinkMainForm/>
            </CardContent>
        </Card> : <></>
    )
}

export default AddLinkMainFormCard;