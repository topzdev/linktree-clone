import { memo, useCallback, useEffect } from "react";
import debounce from "debounce";
import { useFormContext, useWatch } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";

type Props = {
    defaultValues?: any;
    onSubmit: any;
};
const AutoSave = memo(({ defaultValues, onSubmit }: Props) => {
    const methods = useFormContext();
    const watchedData = useWatch({
        control: methods.control,
        defaultValue: defaultValues,
    });

    const debouncedSave = useCallback(
        debounce(() => {
            if (methods.formState.isDirty && methods.formState.isValid) {
                console.log("Saving");
                methods.handleSubmit(onSubmit)();
            }
        }, 1000),
        [methods.formState],
    );

    useDeepCompareEffect(() => {
        if (methods.formState.isDirty && methods.formState.isValid) {
            debouncedSave();
        }
    }, [watchedData, debouncedSave]);

    useEffect(() => {
        return () => {
            debouncedSave.clear();
        };
    }, [debouncedSave]);

    return null;
});

AutoSave.displayName = "AutoSave";

export default AutoSave;
