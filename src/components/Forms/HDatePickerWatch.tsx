import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import getFieldError from '@/utils/getFieldError';
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

type THDatePicker = {
    name: string;
    size?: 'small' | 'medium';
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    setSelectValue: Dispatch<SetStateAction<Dayjs | null>>;
    fncRef?: RefObject<unknown>;
};

const HDatePickerWatch = ({
    name,
    size = 'small',
    label,
    required,
    fullWidth = true,
    sx = {},
    setSelectValue,
}: THDatePicker) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const fromValue = watch(name);

    useEffect(() => {
        setSelectValue(fromValue);
    }, [fromValue, setSelectValue]);

    const fieldError = getFieldError(errors, name);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...fields } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        timezone="system"
                        disablePast
                        {...fields}
                        format="DD/MM/YYYY"
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

export default HDatePickerWatch;
