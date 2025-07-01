import getFieldError from '@/utils/getFieldError';
import { MenuItem, SxProps, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type THSelectProps = {
    label: string;
    name: string;
    sx?: SxProps;
    placeholder?: string;
    size?: 'small' | 'medium';
    options: {
        value: string;
        label: string;
    }[];
};

const HSelect = ({
    label,
    name,
    options,
    sx,
    placeholder,
    size = 'medium',
}: THSelectProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, name);

    return (
        <TextField
            select
            label={label}
            size={size}
            placeholder={placeholder}
            sx={sx}
            {...register(name)}
            error={!!fieldError}
            helperText={fieldError?.message || ''}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default HSelect;
