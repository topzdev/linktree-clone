import React, { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as yup from "yup";
import useDashboardStore from "@/stores/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import buttonsServices from "@/services/buttons";
import {
    ColorPickerSkeleton,
    FormColorPicker,
} from "@/components/ui/color-picker";
import {
    ButtonTypeChooserSkeleton,
    FormButtonTypeChooser,
} from "@/app/dashboard/(main)/appearance/_components/buttons/ButtonTypeChooser";
import profileCssVariables from "@/lib/profileCssVariables";
import { AppearanceSettings } from "../../../../../../../types/models";
import { useUpdateAppearance } from "@/hooks/api/useFetchAppearance";

type Props = {
    children?: React.ReactNode;
    value: AppearanceSettings;
};

export const buttonSchema = yup.object().shape({
    btn_color: yup.string(),
    btn_text_color: yup.string(),
    btn_shadow_color: yup.string(),
    btn_id: yup.number(),
});

export type ButtonForm = yup.InferType<typeof buttonSchema>;

const withShadowButtonType = [12, 11, 10, 9, 8, 7];

const ButtonsForm = ({ value }: Props) => {
    const updateAppearance = useUpdateAppearance();
    const updatePreview = useDashboardStore((state) => state.updatePreview);
    const { toast } = useToast();

    const methods = useForm<ButtonForm>({
        mode: "onChange",
        resolver: yupResolver(buttonSchema),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState,
        getValues,
        trigger,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        reset({
            btn_id: value.btn_id || 1,
            btn_shadow_color: value.btn_shadow_color || "#555",
            btn_color: value.btn_color || "#000",
            btn_text_color: value.btn_text_color || "#fff",
        });
    }, [value]);

    const hasShadowButtonType = useMemo(() => {
        return withShadowButtonType.includes(getValues("btn_id") || -1);
    }, [getValues("btn_id")]);

    const useUpdateContent = useMutation({
        mutationFn: (data: ButtonForm) => {
            return buttonsServices.update(data);
        },
        onSuccess(data, variables, context) {
            updateAppearance({
                btn_id: data.btn_id,
                btn_shadow_color: data.btn_shadow_color,
                btn_color: data.btn_color,
                btn_text_color: data.btn_text_color,
            });
            updatePreview();
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: "Something went wrong",
                description: error.data.message,
                variant: "destructive",
            });
        },
    });

    const [submittedData, setSubmittedData] = React.useState({});

    const onSubmit = async (data: ButtonForm) => {
        await useUpdateContent.mutate(data);
        setSubmittedData(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...submittedData });
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    return (
        <Card
            className={"flex"}
            style={{
                ...profileCssVariables({
                    btn_color: getValues("btn_color") || "#000",
                    btn_text_color: getValues("btn_text_color") || "#fff",
                    btn_shadow_color:
                        getValues("btn_shadow_color") || "#c5c5c5",
                }),
            }}
        >
            <FormProvider {...methods}>
                <CardContent className={"flex w-full flex-col gap-y-5"}>
                    <FormButtonTypeChooser control={control} name={"btn_id"} />

                    <div className="grid grid-cols-12 gap-3 md:gap-5">
                        <div className="col-span-12 md:col-span-6">
                            <FormColorPicker
                                control={control}
                                name={"btn_color"}
                                label={"Background Color"}
                                placeholder="Background Color"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormColorPicker
                                control={control}
                                name={"btn_text_color"}
                                label={"Font Color"}
                                placeholder="Font Color"
                            />
                        </div>
                        {hasShadowButtonType && (
                            <div className="col-span-12 md:col-span-6">
                                <FormColorPicker
                                    control={control}
                                    name={"btn_shadow_color"}
                                    label={"Shadow Color"}
                                    placeholder="Shadow Color"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
                <AutoSave defaultValues={value} onSubmit={onSubmit} />
            </FormProvider>
        </Card>
    );
};

export const ButtonsFormSkeleton = () => {
    return (
        <Card className={"flex"}>
            <CardContent className={"flex w-full flex-col gap-y-5"}>
                <ButtonTypeChooserSkeleton />
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6">
                        <ColorPickerSkeleton />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <ColorPickerSkeleton />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ButtonsForm;
