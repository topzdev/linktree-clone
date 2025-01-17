import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as yup from "yup";
import useDashboardStore from "@/stores/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import AutoSave from "@/components/utils/AutoSave";
import fontsServices from "@/services/fonts";
import {
    ColorPickerSkeleton,
    FormColorPicker,
} from "@/components/ui/color-picker";
import {
    FontSelectSkeleton,
    FormFontSelect,
} from "@/app/dashboard/(main)/appearance/_components/buttons/FontSelect";
import { useUpdateAppearance } from "@/hooks/api/useFetchAppearance";
import { AppearanceSettings } from "../../../../../../../types/models";

type Props = {
    children?: React.ReactNode;
    value: AppearanceSettings;
};

const DEFAULT_FONT = 16; // Inter;
const DEFAULT_FONT_COLOR = "#000";
export const fontsSchema = yup.object().shape({
    font_id: yup.number().required().label("Font Family"),
    font_color: yup.string().nullable().required().label("Font Color"),
});

export type FontsForm = yup.InferType<typeof fontsSchema>;
const FontsForm = ({ value }: Props) => {
    const updateAppearance = useUpdateAppearance();
    const updatePreview = useDashboardStore((state) => state.updatePreview);
    const { toast } = useToast();

    const methods = useForm<FontsForm>({
        mode: "onChange",
        resolver: yupResolver(fontsSchema),
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
            font_id: value.font_id || DEFAULT_FONT,
            font_color: value.font_color || DEFAULT_FONT_COLOR,
        });
    }, [value]);

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateContent = useMutation({
        mutationFn: (data: FontsForm) => {
            return fontsServices.update(data);
        },
        onSuccess(data, variables, context) {
            updateAppearance({
                font_id: data.font_id,
                font_color: data.font_color,
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
    const onSubmit = async (data: FontsForm) => {
        await useUpdateContent.mutate(data);
        setSubmittedData(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...submittedData });
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    return (
        <Card>
            <CardContent className={"flex flex-col gap-y-4"}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={"grid grid-cols-12 gap-y-4"}
                    >
                        <div className="col-span-12">
                            <FormFontSelect
                                control={control}
                                name={"font_id"}
                            />
                        </div>
                        <div className="col-span-12">
                            <FormColorPicker
                                control={control}
                                name={"font_color"}
                                label={"Font Color"}
                                placeholder={"Enter Font Color"}
                            />
                        </div>
                        <AutoSave defaultValues={value} onSubmit={onSubmit} />
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};

export const FontsFormSkeleton = () => {
    return (
        <Card>
            <CardContent
                className={"flex flex-col items-center justify-center gap-y-4"}
            >
                <FontSelectSkeleton />
                <ColorPickerSkeleton />
            </CardContent>
        </Card>
    );
};

export default FontsForm;
