import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type THInputProps = {
    label: string;
    name: string;
    type?: string;
};

const HInput = ({ label, type = 'text', name }: THInputProps) => {
    const { register } = useFormContext();
    return <TextField label={label} type={type} {...register(name)} />;
};

export default HInput;
