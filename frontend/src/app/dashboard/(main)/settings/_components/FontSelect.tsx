import React, {useEffect, useMemo, useState} from "react";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import fonts from "@/data/fonts";
import Typography, {TypographySkeleton} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import {useDebounce} from "@uidotdev/usehooks";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import MaterialSymbolsSearchRounded from "@/components/icons/MaterialSymbolsSearchRounded";
import List, {ListGroup, ListItem} from "@/components/ui/list";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {Controller} from "react-hook-form";
import MaterialSymbolsCheckRounded from "@/components/icons/MaterialSymbolsCheckRounded";
import {Font} from "../../../../../../types/models";

type Props = {
    children?: React.ReactNode,
    value?: number,
    onChange?: (value?: number) => void;
} & InputWrapperProps;

const FontSelect = ({value, onChange, label, ...props}: Props) => {
    const [_value, _setValue] = useState<number | undefined>(value);
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const debouncedSearchTerm = useDebounce(search, 300);

    useEffect(() => {
        _setValue(value);
    }, [value]);

    const items = useMemo<{ name: string, items: Font[] }[]>(() => {
        const filtered = debouncedSearchTerm !== '' ? fonts.filter(item => item.title.includes(debouncedSearchTerm)) : fonts;

        const groupedItems: any = filtered.reduce<Record<number, Font[]>>((acc, item) => {
            const {group_id} = item;
            if (!acc[group_id]) {
                acc[group_id] = [];
            }
            acc[group_id].push(item);
            return acc;
        }, {});

        const groupName: Record<string, string> = {
            '1': 'Classic',
            '2': 'Modern',
            '3': 'Unique'
        }

// Transform grouped items into the desired format
        const result: any = Object.keys(groupedItems).map(group_id => ({
            name: groupName[group_id],
            items: groupedItems[group_id]
        }));

        return result;
    }, [debouncedSearchTerm]);


    const handleChange = () => {
        if (onChange) {
            onChange(_value);
        }
        setOpen(false)
    }

    const selected = useMemo(() => {
        return fonts.filter(item => item.id === value)[0];
    }, [value]);

    const preSelected = useMemo(() => {
        return fonts.filter(item => item.id === _value)[0]
    }, [_value])

    return <InputWrapper {...props}>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div
                    className={'flex border border-border rounded-lg items-center  gap-x-3 md:gap-x-4 p-3 md:p-4 py-2.5 md:py-3 cursor-pointer select-none group hover:bg-slate-100'}
                    style={{
                        fontFamily: selected.title,
                    }}>
                    <div
                        className={'flex items-center justify-center  h-[40px] w-[40px] md:h-[50px] md:w-[50px] bg-slate-100 rounded-lg text-xl font-bold group-hover:bg-white'}>
                        Aa
                    </div>

                    <Typography className={'text-lg md:text-xl'}>
                        {selected.title}
                    </Typography>

                </div>
            </DialogTrigger>
            <DialogContent className={'min-h-[600px] overflow-hidden'}>
                <DialogHeader className={'sticky gap-y-4'}>
                    <DialogTitle>Select a Font</DialogTitle>
                    <div className={'flex w-full'}>
                        <Input placeholder={'Search'} className={'w-full'} value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               leftAdornment={<MaterialSymbolsSearchRounded/>}/>
                    </div>
                </DialogHeader>

                <List className="overflow-y-scroll h-[500px] max-h-[500px]  -mr-5">
                    {items.map(item => <ListGroup groupTitle={item.name}>
                        {item.items.map(sub => <ListItem selected={preSelected.id === sub.id} key={sub.key}
                                                         style={{fontFamily: sub.title,}}
                                                         onClick={() => _setValue(sub.id)}>
                            <Typography className={'text-lg'}>
                                {sub.title}
                            </Typography>

                            {selected.id === sub.id &&
                                <MaterialSymbolsCheckRounded className={'text-green-500 text-2xl'}/>
                            }
                        </ListItem>)}
                    </ListGroup>)}
                </List>

                <DialogFooter>
                    <Button disabled={value === _value} onClick={handleChange} className="w-full" size='lg'>Save
                        Changes</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    </InputWrapper>
}


type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormFontSelect = ({name, control, ...props}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
                <FontSelect
                    {...props}
                    {...field}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export const FontSelectSkeleton = () => {
    return <div
        className={'flex border border-border rounded-lg items-center gap-x-4 p-4 py-3 cursor-pointer select-none w-full'}>
        <Skeleton className="h-[50px] min-w-[50px]">
        </Skeleton>
        <TypographySkeleton>Loading...</TypographySkeleton>
    </div>
}

export default FontSelect;