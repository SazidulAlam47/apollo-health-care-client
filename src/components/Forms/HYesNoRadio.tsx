import getFieldError from '@/utils/getFieldError';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    SxProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type THYesNoRadioProps = {
    label: string;
    name: string;
    sx?: SxProps;
    disabled?: boolean;
};

const HYesNoRadio = ({
    label,
    name,
    sx,
    disabled = false,
}: THYesNoRadioProps) => {
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
                <FormControl sx={sx} error={!!fieldError}>
                    <FormLabel id={`${name}-radio-group-label`}>
                        {label}
                    </FormLabel>
                    <RadioGroup
                        {...field}
                        row
                        aria-labelledby={`${name}-radio-group-label`}
                        value={
                            field.value !== undefined
                                ? field.value.toString()
                                : ''
                        }
                        onChange={(event) => {
                            const value = event.target.value === 'true';
                            field.onChange(value);
                        }}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio disabled={disabled} />}
                            label="Yes"
                            disabled={disabled}
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio disabled={disabled} />}
                            label="No"
                            disabled={disabled}
                        />
                    </RadioGroup>
                    {fieldError && (
                        <FormHelperText>{fieldError.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default HYesNoRadio;
