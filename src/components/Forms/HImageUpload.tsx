import { Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import getFieldError from '@/utils/getFieldError';
import '@/scss/file.style.scss';

type THImageUploadProps = {
    title: string;
};

const HImageUpload = ({ title }: THImageUploadProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, 'image');

    return (
        <Stack textAlign="start" spacing={0.5}>
            <label
                htmlFor="file-upload"
                style={{
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: '300',
                    color: '#111827',
                }}
            >
                {title}
            </label>
            <input
                type="file"
                id="file-upload"
                accept="image/*"
                {...register('image')}
            />
            {fieldError && (
                <Typography fontSize={13} color="error">
                    {fieldError.message}
                </Typography>
            )}
        </Stack>
    );
};

export default HImageUpload;
