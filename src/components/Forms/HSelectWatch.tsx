import getFieldError from '@/utils/getFieldError';
import { MenuItem, SxProps, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

type THSelectProps<T = string> = {
    label: string;
    name: string;
    sx?: SxProps;
    placeholder?: string;
    size?: 'small' | 'medium';
    options: {
        value: string;
        label: string;
    }[];
    setSelectValue: Dispatch<SetStateAction<T | null>>;
};

const HSelectWatch = <T = string>({
    label,
    name,
    options,
    sx,
    placeholder,
    size = 'medium',
    setSelectValue,
}: THSelectProps<T>) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const fromValue = watch(name);

    useEffect(() => {
        setSelectValue(fromValue as T);
    }, [fromValue, setSelectValue]);

    const fieldError = getFieldError(errors, name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    select
                    label={label}
                    size={size}
                    placeholder={placeholder}
                    sx={sx}
                    {...field}
                    error={!!fieldError}
                    helperText={fieldError?.message || ''}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};

export default HSelectWatch;
