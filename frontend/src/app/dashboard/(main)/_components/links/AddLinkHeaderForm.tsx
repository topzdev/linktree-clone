import React, {useMemo} from "react";
import Typography from "@/components/ui/typography";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger} from "@/components/ui/select";
import MaterialSymbolsKeyboardArrowDownRounded from "@/components/icons/MaterialSymbolsKeyboardArrowDownRounded";
import {IconButton} from "@/components/ui/icon-button";
import MaterialSymbolsCloseRounded from "@/components/icons/MaterialSymbolsCloseRounded";
import AddLinkForm from "@/app/dashboard/(main)/_components/links/AddLinkForm";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import linkServices, {AddLink} from "@/services/links";
import {useToast} from "@/components/ui/use-toast";
import {Link} from "../../../../../../types/models";
import AddHeaderForm from "@/app/dashboard/(main)/_components/links/AddHeaderForm";
import {FetchError} from "ofetch";
import useDashboardStore from "@/stores/dashboard";
import LinkTypeSelect from "@/app/dashboard/(main)/_components/links/LinkTypeSelect";

type Props = {
    children?: React.ReactNode,
    showClose?: boolean;
}

const AddLinkMainForm = ({showClose = true}: Props) => {
    const setType = useDashboardStore(state => state.setType);
    const type = useDashboardStore(state => state.type);
    const queryClient = useQueryClient();
    const {toast} = useToast();

    const menuText = useMemo(() => type === '1' ? 'Link' : 'Header', [type]);

    const useUpdateContent = useMutation({
        mutationFn: (data: AddLink) => {
            return linkServices.add(data);
        },
        onSuccess(data, variables, context) {
            queryClient.setQueryData(
                ['links'],
                (oldData: Link[]) => {
                    console.log('Add Link', oldData);
                    return oldData
                        ? [
                            data,
                            ...oldData,
                        ]
                        : oldData
                },
            )
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: 'Something went wrong',
                description: error.data.message,
                variant: 'destructive'
            })
        },
    })

    const handleAdd = async (data: AddLink) => {
        await useUpdateContent.mutate(data);
    }

    return <>
        <div className="flex flex-row items-start relative !pb-4">

            <LinkTypeSelect value={type} onValueChange={setType}>
                <Typography variant={'h3'}>Add {menuText}</Typography>
                <MaterialSymbolsKeyboardArrowDownRounded className={'text-3xl'}/>
            </LinkTypeSelect>

            {showClose && <IconButton size="sm" className={'ml-auto !mt-0 text-2xl text-muted-foreground'}
                                      onClick={() => setType('0')}>
                <MaterialSymbolsCloseRounded/>
            </IconButton>}
        </div>
        <div className="flex">
            {type === '1' ?
                <AddLinkForm loading={useUpdateContent.isPending} onAdd={handleAdd}/> :
                <AddHeaderForm loading={useUpdateContent.isPending} onAdd={handleAdd}/>
            }
        </div>
    </>
}

export default AddLinkMainForm;