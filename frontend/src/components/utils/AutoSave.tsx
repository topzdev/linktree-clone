import React, {memo, useCallback} from "react";

import debounce from "debounce";
import {useFormContext, useWatch} from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";

const AutoSave = memo(({defaultValues, onSubmit}: Props) => {
    // Get the closest form methods
    const methods = useFormContext();

    // Save if this function is called and then not called again within 1000ms
    // eslint-disable-next-line
    const debouncedSave = useCallback(
        debounce(() => {
            console.log("Saving");
            methods.handleSubmit(onSubmit)();
        }, 1000),
        []
    );

    // // Watch all the data, provide with defaultValues from server, this way we know if the new data came from server or where actually edited by user
    // const watchedData = methods.watch(undefined, defaultValues);
    const watchedData = useWatch({
        control: methods.control,
        defaultValue: defaultValues
    });

    // Can't use useEffect anymore :(
    // useEffect(() => {
    //   if (methods.formState.isDirty && methods.formState.isValid) {
    //     debouncedSave();
    //   }
    //   // eslint-disable-next-line
    // }, [watchedData]);

    // So we try something else

    useDeepCompareEffect(() => {
        console.log("Triggered");
        if (methods.formState.isDirty) {
            debouncedSave();
        }
    }, [watchedData]);

    return (<></>
    );
});

AutoSave.displayName = "AutoSave";

type Props = {
    defaultValues: any;
    onSubmit: any;
};

export default AutoSave;
