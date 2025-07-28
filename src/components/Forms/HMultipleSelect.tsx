import getFieldError from '@/utils/getFieldError';
import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SxProps,
    Theme,
    useTheme,
} from '@mui/material';
import { RefObject, useImperativeHandle } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export type THMultipleSelectFncRef = {
    resetField: () => void;
};

type TOption = {
    value: string;
    label: string;
};

type THSelectProps = {
    label: string;
    name: string;
    sx?: SxProps;
    size?: 'small' | 'medium';
    disabled?: boolean;
    fncRef?: RefObject<unknown>;
    options: TOption[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const HMultipleSelect = ({
    label,
    name,
    options,
    sx,
    size = 'medium',
    disabled = false,
    fncRef = undefined,
}: THSelectProps) => {
    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext();

    const resetField = () => {
        setValue(name, undefined);
    };

    useImperativeHandle(fncRef, () => ({
        resetField,
    }));

    const fieldError = getFieldError(errors, name);
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl sx={{ width: '100%', ...sx }}>
                    <InputLabel id={`${name}-multiple-chip-label`}>
                        {label}
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId={`${name}-multiple-chip-label`}
                        id={`${name}-multiple-chip`}
                        multiple
                        disabled={disabled}
                        value={field.value || []}
                        onChange={field.onChange}
                        input={
                            <OutlinedInput
                                id={`select-multiple-chip-${name}`}
                                label={label}
                            />
                        }
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {(selected as string[]).map((value) => {
                                    const option = options.find(
                                        (opt) => opt.value === value,
                                    );
                                    return (
                                        <Chip
                                            key={value}
                                            label={
                                                option ? option.label : value
                                            }
                                        />
                                    );
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        size={size}
                        error={!!fieldError}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                style={getStyles(
                                    option.value,
                                    field.value || [],
                                    theme,
                                )}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {fieldError && (
                        <Box
                            sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}
                        >
                            {fieldError.message}
                        </Box>
                    )}
                </FormControl>
            )}
        />
    );
};

export default HMultipleSelect;
