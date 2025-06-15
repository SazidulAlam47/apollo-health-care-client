import getFieldError from '@/utils/getFieldError';
import { SxProps, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type THInputProps = {
    label: string;
    name: string;
    type?: string;
    sx?: SxProps;
    placeholder?: string;
    inputMode?:
        | 'text'
        | 'search'
        | 'email'
        | 'tel'
        | 'url'
        | 'none'
        | 'numeric'
        | 'decimal';
};

const HInput = ({
    label,
    name,
    type = 'text',
    sx,
    placeholder,
    inputMode = 'text',
}: THInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, name);

    return (
        <TextField
            label={label}
            type={type}
            sx={sx}
            placeholder={placeholder}
            {...register(name)}
            error={!!fieldError}
            helperText={fieldError?.message || ''}
            inputMode={inputMode}
        />
    );
};

export default HInput;
