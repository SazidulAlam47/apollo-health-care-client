import capitalize from '@/utils/capitalize';
import { Chip } from '@mui/material';
import { ComponentType } from 'react';

type THChipProps = {
    label: string;
    color: string;
    icon: ComponentType<{ size: number; color: string }>;
};

const HChip = ({ label, color, icon: Icon }: THChipProps) => {
    return (
        <Chip
            label={capitalize(label.replace('_', ' '))}
            variant="outlined"
            icon={<Icon size={20} color={color} />}
            sx={{
                borderColor: color,
                color: color,
                paddingLeft: 0.5,
            }}
        />
    );
};

export default HChip;
