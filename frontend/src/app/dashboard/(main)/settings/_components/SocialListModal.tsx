"use client"

import React, {useEffect, useMemo, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import MaterialSymbolsSearchRounded from "@/components/icons/MaterialSymbolsSearchRounded";
import socialIcons from "@/data/social-icons";
import SocialListItem from "@/app/dashboard/(main)/settings/_components/SocialListItem";
import List from "@/components/ui/list";
import pageRoutes from "@/configs/page-routes";
import {useDebounce} from "@uidotdev/usehooks";
import useFetchSocials from "@/hooks/api/useFetchSocials";

type Props = {
    children?: React.ReactNode
}

export type SocialIcon = typeof socialIcons[0];

const SocialListModal = (props: Props) => {
    const {isLoading, data: added} = useFetchSocials();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(true);
    const debouncedSearchTerm = useDebounce(search, 300);

    const icons = useMemo(() => {
        return debouncedSearchTerm !== '' ? socialIcons.filter(item => item.title.includes(debouncedSearchTerm)) : socialIcons
    }, [debouncedSearchTerm]);

    const addedSocial = (social_id: string) => {
        return added?.socials.filter(item => item.social_id === social_id)[0];
    }

    useEffect(() => {
        if (!open) {
            router.push(pageRoutes.dashboard.settings.socials.href);
        }
    }, [open, setOpen]);

    return <>
        <Dialog defaultOpen={true} open={open} onOpenChange={setOpen}>
            <DialogContent className={'min-h-[600px] pb-0 overflow-hidden'}>
                <DialogHeader className={'sticky gap-y-4'}>
                    <DialogTitle>Add Social Icon</DialogTitle>
                    <div className={'flex w-full'}>
                        <Input placeholder={'Search'} className={'w-full'} value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               leftAdornment={<MaterialSymbolsSearchRounded/>}/>
                    </div>
                </DialogHeader>

                <List className="overflow-y-scroll max-h-[500px]  -mr-5">
                    {icons.map(item => <SocialListItem added={addedSocial(item.id)} key={item.id} info={item}/>)}
                </List>

            </DialogContent>
        </Dialog>
    </>
}

export default SocialListModal;