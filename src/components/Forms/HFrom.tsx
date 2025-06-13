import { ReactNode } from 'react';
import {
    useForm,
    FormProvider,
    FieldValues,
    SubmitHandler,
} from 'react-hook-form';

type THFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
};

const HFrom = ({ children, onSubmit }: THFormProps) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default HFrom;
