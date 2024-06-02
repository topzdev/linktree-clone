import React from "react";
import {Controller} from "react-hook-form";
import {cn} from "@/lib/utils";
import Typography, {TypographyProps} from "@/components/ui/typography";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {TooltipArrow} from "@radix-ui/react-tooltip";

type Props = {
    children?: React.ReactNode,
    control: any,
    name: string
} & TypographyProps

const LinkInputField = ({control, name, ...props}: Props) => {
    return <TooltipProvider>
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Tooltip open={!!error?.message}>
                    <TooltipTrigger>
                        <Typography as={'div'} {...props}>
                            <input
                                placeholder="Enter title here"
                                className={cn("placeholder:text-foreground-secondary !outline-0 w-full", error?.message ? '!text-destructive' : '')}
                                autoComplete="off"
                                {...field}
                            />
                        </Typography>
                    </TooltipTrigger>
                    <TooltipContent className={'border-destructive bg-destructive text-destructive-foreground'}>
                        <Typography variant={'small'}>{error?.message}</Typography>
                        <TooltipArrow className={'fill-destructive'} width={11} height={5} />
                    </TooltipContent>
                </Tooltip>
            )}
        />
    </TooltipProvider>
}

export default LinkInputField;