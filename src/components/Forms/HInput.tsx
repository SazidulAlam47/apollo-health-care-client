import getFieldError from '@/utils/getFieldError';
import { SxProps, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

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
    minRows?: number;
    disabled?: boolean;
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
    minRows = 1,
    disabled = false,
}: THInputProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    sx={sx}
                    size={size}
                    placeholder={placeholder}
                    error={!!fieldError}
                    helperText={fieldError?.message || ''}
                    inputMode={inputMode}
                    multiline={multiline}
                    minRows={minRows}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default HInput;
