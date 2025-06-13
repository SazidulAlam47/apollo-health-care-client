import getFieldError from '@/utils/getFieldError';
import { SxProps, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type THInputProps = {
    label: string;
    name: string;
    type?: string;
    sx?: SxProps;
    placeholder?: string;
};

const HInput = ({
    label,
    name,
    type = 'text',
    sx,
    placeholder,
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
        />
    );
};

export default HInput;
