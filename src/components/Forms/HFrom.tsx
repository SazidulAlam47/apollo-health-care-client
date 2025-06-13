import { ReactNode, RefObject, useImperativeHandle } from 'react';
import {
    useForm,
    FormProvider,
    FieldValues,
    SubmitHandler,
} from 'react-hook-form';

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
};

type THFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    fncRef?: RefObject<unknown>;
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

    useImperativeHandle(fncRef, () => ({
        resetFrom,
    }));

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default HFrom;
