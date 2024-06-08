import useDashboardStore from "@/stores/dashboard";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import React from "react";
import AddLinkMainForm from "@/app/dashboard/(main)/_components/links/AddLinkHeaderForm";

const AddLinkMainFormDialog = () => {
    const setType = useDashboardStore(state => state.setType);
    const type = useDashboardStore(state => state.type);

    return <Dialog open={type !== '0'} onOpenChange={() => setType('0')}>
        <DialogContent className="max-w-full sm:max-w-lg gap-y-0">
            <AddLinkMainForm showClose={false}/>
        </DialogContent>
    </Dialog>
}

export default AddLinkMainFormDialog;

