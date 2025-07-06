import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import getFieldError from '@/utils/getFieldError';

type THTimePicker = {
    name: string;
    size?: 'small' | 'medium';
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
};

const HTimePicker = ({
    name,
    size = 'small',
    label,
    required,
    fullWidth = true,
    sx = {},
}: THTimePicker) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, name);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...fields } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        timezone="system"
                        {...fields}
                        label={label}
                        value={value || Date.now()}
                        onChange={(date) => onChange(date)}
                        slotProps={{
                            textField: {
                                required: required,
                                size: size,
                                sx: sx,
                                variant: 'outlined',
                                fullWidth: fullWidth,
                                error: !!fieldError,
                                helperText: fieldError?.message || '',
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default HTimePicker;
