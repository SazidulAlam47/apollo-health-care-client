import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import '@/scss/file.style.scss';

type THImageUploadProps = {
    title: string;
};

const HImageUpload = ({ title }: THImageUploadProps) => {
    const { register } = useFormContext();
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
        </Stack>
    );
};

export default HImageUpload;
