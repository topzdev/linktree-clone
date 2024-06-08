import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import LinkTypeSelect from "@/app/dashboard/(main)/_components/links/LinkTypeSelect";
import MaterialSymbolsKeyboardArrowDownRounded from "@/components/icons/MaterialSymbolsKeyboardArrowDownRounded";
import useDashboardStore from "@/stores/dashboard";
import {IconButton} from "@/components/ui/icon-button";
import {mobileNavbarHeight} from "@/app/dashboard/_components/MobileNavigationBottomBar";
import MaterialSymbolsAdd from "@/components/icons/MaterialSymbolsAdd";

type Props = {
    children?: React.ReactNode
}

const AddButtons = (props: Props) => {
    const [select, setSelect] = useState(false);
    const setType = useDashboardStore(state => state.setType);
    const type = useDashboardStore(state => state.type);

    return <>
        {type === '0' && <>
            <Button rounded size={'lg'} className="w-full max-lg:hidden relative overflow-hidden ring-0 mt-2.5"
                    onClick={() => setType('1')}>
                Add Link
                <div className="bg-primary-600 absolute right-0 min-h-full z-20 w-[50px] h-[52px] flex items-center justify-center ring:0"  onClick={(e) => {
                    setSelect(state => !state)
                    e.stopPropagation();
                }}>
                    <MaterialSymbolsKeyboardArrowDownRounded className={'text-3xl'}/>
                </div>
            </Button>
            <LinkTypeSelect contentProps={{
                align: 'end',
                className: 'w-[300px]'
            }} open={select} onOpenChange={setSelect} value={type} onValueChange={setType}/>
        </>
        }



        <IconButton size="xl" color={'primary'} variant="filled" rounded
                    style={{
                        bottom: (mobileNavbarHeight + 20) + 'px'
                    }}
                    className={"fixed right-4 shadow-lg z-10 lg:hidden"}
                    onClick={() => setType('1')}
        >
            <MaterialSymbolsAdd/>
        </IconButton>
    </>

}

export default AddButtons;