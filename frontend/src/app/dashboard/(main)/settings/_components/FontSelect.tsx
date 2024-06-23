import React, {useEffect, useMemo, useState} from "react";
import {Controller} from "react-hook-form";
import InputWrapper, {InputWrapperProps} from "@/components/ui/input-wrapper";
import fonts from "@/data/fonts";
import Typography from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import {useDebounce} from "@uidotdev/usehooks";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import MaterialSymbolsSearchRounded from "@/components/icons/MaterialSymbolsSearchRounded";
import List, {ListItem} from "@/components/ui/list";
import MaterialSymbolsCheckRounded from "@/components/icons/MaterialSymbolsCheckRounded";
import {Button} from "@/components/ui/button";

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

    const items = useMemo(() => {
        return debouncedSearchTerm !== '' ? fonts.filter(item => item.title.includes(debouncedSearchTerm)) : fonts
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
                    className={'flex border border-border rounded-lg items-center gap-x-4 p-4 py-3 cursor-pointer select-none group hover:bg-slate-100'}
                    style={{
                        fontFamily: selected.title,
                    }}>
                    <div
                        className={'flex items-center justify-center h-[50px] w-[50px] bg-slate-100 rounded-lg text-xl font-bold group-hover:bg-white'}>
                        Aa
                    </div>

                    <Typography className={'text-xl'}>
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

                <List className="overflow-y-scroll max-h-[500px]  -mr-5">
                    {items.map(item => <ListItem selected={preSelected.id === item.id} key={item.key} style={{
                        fontFamily: item.title,
                    }}
                                                 onClick={() => _setValue(item.id)}>
                        <Typography className={'text-lg'}>
                            {item.title}
                        </Typography>

                        {selected.id === item.id &&
                            <MaterialSymbolsCheckRounded className={'text-green-500 text-2xl'}/>
                        }
                    </ListItem>)}
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

export default FontSelect;