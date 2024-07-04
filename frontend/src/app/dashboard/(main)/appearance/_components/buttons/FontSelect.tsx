import React, { useEffect, useMemo, useState } from "react";
import InputWrapper, { InputWrapperProps } from "@/components/ui/input-wrapper";
import fonts from "@/data/fonts";
import Typography, { TypographySkeleton } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MaterialSymbolsSearchRounded from "@/components/icons/MaterialSymbolsSearchRounded";
import List, { ListGroup, ListItem } from "@/components/ui/list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller } from "react-hook-form";
import MaterialSymbolsCheckRounded from "@/components/icons/MaterialSymbolsCheckRounded";
import { Font } from "../../../../../../../types/models";
import { cn } from "@/lib/utils";

type Props = {
    children?: React.ReactNode;
    value?: number;
    onChange?: (value?: number) => void;
} & InputWrapperProps;

const FontSelect = ({ value, onChange, label, ...props }: Props) => {
    const [_value, _setValue] = useState<number | undefined>(value);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const debouncedSearchTerm = useDebounce(search, 300);

    useEffect(() => {
        _setValue(value);
    }, [value]);

    const items = useMemo<{ name: string; items: Font[] }[]>(() => {
        const filtered =
            debouncedSearchTerm !== ""
                ? fonts.filter((item) =>
                      item.title.includes(debouncedSearchTerm),
                  )
                : fonts;

        const groupedItems: any = filtered.reduce<Record<number, Font[]>>(
            (acc, item) => {
                const { group_id } = item;
                if (!acc[group_id]) {
                    acc[group_id] = [];
                }
                acc[group_id].push(item);
                return acc;
            },
            {},
        );

        const groupName: Record<string, string> = {
            "1": "Classic",
            "2": "Modern",
            "3": "Unique",
        };

        // Transform grouped items into the desired format
        const result: any = Object.keys(groupedItems).map((group_id) => ({
            name: groupName[group_id],
            items: groupedItems[group_id],
        }));

        return result;
    }, [debouncedSearchTerm]);

    const handleChange = () => {
        if (onChange) {
            onChange(_value);
        }
        setOpen(false);
    };

    const selected = useMemo(() => {
        return fonts.filter((item) => item.id === value)[0];
    }, [value]);

    const preSelected = useMemo(() => {
        return fonts.filter((item) => item.id === _value)[0];
    }, [_value]);

    const itemFont = (id: number) => {
        return fonts.filter((item) => item.id === id)[0];
    };

    return (
        <InputWrapper {...props}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div
                        className={
                            cn(
                                "group flex cursor-pointer select-none items-center gap-x-3 rounded-lg border border-border p-3 py-2.5 hover:bg-slate-100 md:gap-x-4 md:p-4 md:py-3",
                            ) +
                            " " +
                            selected?.className
                        }
                    >
                        <div
                            className={
                                "flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100 text-xl font-bold group-hover:bg-white md:h-[50px] md:w-[50px]"
                            }
                        >
                            Aa
                        </div>

                        <Typography className={"text-lg md:text-xl"}>
                            {selected?.title}
                        </Typography>
                    </div>
                </DialogTrigger>
                <DialogContent className={"min-h-[600px] overflow-hidden"}>
                    <DialogHeader className={"sticky gap-y-4"}>
                        <DialogTitle>Select a Font</DialogTitle>
                        <div className={"flex w-full"}>
                            <Input
                                placeholder={"Search"}
                                className={"w-full"}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                leftAdornment={<MaterialSymbolsSearchRounded />}
                            />
                        </div>
                    </DialogHeader>

                    <List className="-mr-5 h-[500px] max-h-[500px] overflow-y-scroll">
                        {items.map((item) => (
                            <ListGroup groupTitle={item.name}>
                                {item.items.map((sub) => (
                                    <ListItem
                                        selected={preSelected?.id === sub.id}
                                        key={sub.key}
                                        className={itemFont(sub.id).className}
                                        onClick={() => _setValue(sub.id)}
                                    >
                                        <Typography className={"text-lg"}>
                                            {sub.title}
                                        </Typography>

                                        {selected?.id === sub.id && (
                                            <MaterialSymbolsCheckRounded
                                                className={
                                                    "text-2xl text-green-500"
                                                }
                                            />
                                        )}
                                    </ListItem>
                                ))}
                            </ListGroup>
                        ))}
                    </List>

                    <DialogFooter>
                        <Button
                            disabled={value === _value}
                            onClick={handleChange}
                            className="w-full"
                            size="lg"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </InputWrapper>
    );
};

type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormFontSelect = ({ name, control, ...props }: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
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
    return (
        <div
            className={
                "flex w-full cursor-pointer select-none items-center gap-x-4 rounded-lg border border-border p-4 py-3"
            }
        >
            <Skeleton className="h-[50px] min-w-[50px]"></Skeleton>
            <TypographySkeleton>Loading...</TypographySkeleton>
        </div>
    );
};

export default FontSelect;
