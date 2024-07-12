import React from "react";
import InputWrapper, {
    InputWrapperSkeleton,
} from "@/components/ui/input-wrapper";
import ButtonsItem, {
    ButtonsItemSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/buttons/ButtonsItem";
import { buttonsStyle } from "@/data/buttons-style";
import { Controller } from "react-hook-form";

type Props = {
    children?: React.ReactNode;
    onChange?: (btn_id: number) => void;
    value?: number;
};
export const buttonsStyles = [
    {
        name: "Fill",
        items: [
            buttonsStyle.fill,
            buttonsStyle.fillrounded,
            buttonsStyle.fillcircular,
        ],
    },
    {
        name: "Outline",
        items: [
            buttonsStyle.outline,
            buttonsStyle.outlinerounded,
            buttonsStyle.outlinecircular,
        ],
    },
    {
        name: "Soft Shadow",
        items: [
            buttonsStyle.softshadow,
            buttonsStyle.softshadowrounded,
            buttonsStyle.softshadowcircular,
        ],
    },
    {
        name: "Hard Shadow",
        items: [
            buttonsStyle.hardshadow,
            buttonsStyle.hardshadowrounded,
            buttonsStyle.hardshadowcircular,
        ],
    },
];
const ButtonTypeChooser = ({ value, onChange }: Props) => {
    return (
        <div className={"flex w-full flex-col gap-y-4 md:gap-y-5"}>
            {buttonsStyles.map((item) => (
                <InputWrapper
                    key={item.name}
                    label={item.name}
                    className={"w-full"}
                >
                    <div
                        className={
                            "grid w-full grid-cols-12 gap-x-2 md:gap-x-2.5"
                        }
                    >
                        {item.items.map((button) => (
                            <ButtonsItem
                                key={button.key}
                                buttonType={button.key}
                                active={value === button.id}
                                onClick={() =>
                                    onChange ? onChange(button.id) : null
                                }
                            />
                        ))}
                    </div>
                </InputWrapper>
            ))}
        </div>
    );
};

type ControlledProp = {
    control: any;
    name: string;
} & Props;
export const FormButtonTypeChooser = ({
    name,
    control,
    ...props
}: ControlledProp) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
                <ButtonTypeChooser
                    {...props}
                    {...field}
                    // error={fieldState.error?.message}
                />
            )}
        ></Controller>
    );
};

export const ButtonTypeChooserSkeleton = () => {
    return (
        <div className={"flex w-full flex-col gap-y-5"}>
            {buttonsStyles.map((item) => (
                <InputWrapperSkeleton key={item.name}>
                    <div className={"grid w-full grid-cols-12 gap-x-2.5"}>
                        <ButtonsItemSkeleton />
                        <ButtonsItemSkeleton />
                        <ButtonsItemSkeleton />
                    </div>
                </InputWrapperSkeleton>
            ))}
        </div>
    );
};

export default ButtonTypeChooser;
