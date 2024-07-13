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
import themesServices, { ThemesPreview } from "@/services/themes";
import {
    FormThemeChooser,
    ThemeChooserSkeleton,
} from "@/app/dashboard/(main)/appearance/_components/themes/ThemeChooser";
import { useUpdateAppearance } from "@/hooks/api/useFetchAppearance";
import { AppearanceSettings } from "../../../../../../../types/models";

type Props = {
    children?: React.ReactNode;
    value: AppearanceSettings;
    themes?: ThemesPreview[];
};

export const themesSchema = yup.object().shape({
    theme_id: yup.number().nullable(),
});

export type ThemesForm = yup.InferType<typeof themesSchema>;
const ThemesForm = ({ value, themes }: Props) => {
    const updateAppearance = useUpdateAppearance();
    const updatePreview = useDashboardStore((state) => state.updatePreview);
    const { toast } = useToast();

    const methods = useForm<ThemesForm>({
        mode: "onChange",
        resolver: yupResolver(themesSchema),
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
            theme_id: value.theme_id,
        });
    }, [value]);

    const [submittedData, setSubmittedData] = React.useState({});

    const useUpdateContent = useMutation({
        mutationFn: (data: ThemesForm) => {
            return themesServices.update(data);
        },
        onSuccess(data, variables, context) {
            updateAppearance({
                bg_id: data.bg_id,
                theme_id: data.theme_id,
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
    const onSubmit = async (data: ThemesForm) => {
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
                        {themes && (
                            <div className="col-span-12">
                                <FormThemeChooser
                                    items={themes}
                                    control={control}
                                    name={"theme_id"}
                                />
                            </div>
                        )}
                        <AutoSave defaultValues={value} onSubmit={onSubmit} />
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};

export const ThemesFormSkeleton = () => {
    return (
        <Card>
            <CardContent
                className={"flex flex-col items-center justify-center gap-y-4"}
            >
                <ThemeChooserSkeleton />
            </CardContent>
        </Card>
    );
};

export default ThemesForm;
