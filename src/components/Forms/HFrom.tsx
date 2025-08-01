/* eslint-disable no-unused-vars */
import { ReactNode, RefObject, useImperativeHandle } from 'react';
import {
    useForm,
    FormProvider,
    FieldValues,
    SubmitHandler,
} from 'react-hook-form';

export type TUFromFncRef = {
    resetFrom: () => void;
    setFieldValues: (newValues: Record<string, unknown>) => void;
};

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
};

type THFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    fncRef?: RefObject<TUFromFncRef>;
} & TFormConfig;

const HFrom = ({
    children,
    onSubmit,
    fncRef = undefined,
    defaultValues,

    resolver,
}: THFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }
    if (resolver) {
        formConfig.resolver = resolver;
    }

    const methods = useForm(formConfig);

    const resetFrom = () => {
        methods.reset();
    };

    const setFieldValues = (newValues: Record<string, unknown>) => {
        Object.keys(newValues).forEach((key) => {
            methods.setValue(key, newValues[key], {
                shouldDirty: true,
                shouldTouch: true,
            });
        });
    };

    useImperativeHandle(fncRef, () => ({
        resetFrom,
        setFieldValues,
    }));

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default HFrom;
