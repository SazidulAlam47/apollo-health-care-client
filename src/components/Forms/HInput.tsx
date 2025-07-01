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
    size?: 'small' | 'medium';
    multiline?: boolean;
    rows?: number;
    minRows?: number;
    maxRows?: number;
};

const HInput = ({
    label,
    name,
    type = 'text',
    sx,
    placeholder,
    inputMode = 'text',
    size = 'medium',
    multiline = false,
    rows = 1,
    minRows = 1,
    maxRows = 1,
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
            size={size}
            placeholder={placeholder}
            {...register(name)}
            error={!!fieldError}
            helperText={fieldError?.message || ''}
            inputMode={inputMode}
            multiline={multiline}
            rows={rows}
            minRows={minRows}
            maxRows={maxRows}
        />
    );
};

export default HInput;
