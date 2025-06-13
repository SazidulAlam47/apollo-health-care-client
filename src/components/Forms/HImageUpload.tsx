import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const HImageUpload = () => {
    const { register } = useFormContext();
    return (
        <Stack
            display="flex"
            flexDirection="column"
            textAlign="start"
            gap={0.5}
        >
            <label
                htmlFor="file-upload"
                className="font-light text-sm text-gray-900"
            >
                Profile Photo
            </label>
            <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="file-input"
                {...register('image')}
            />
        </Stack>
    );
};

export default HImageUpload;
