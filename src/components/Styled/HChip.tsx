import { TAppointmentStatus } from '@/types';
import capitalize from '@/utils/capitalize';
import { Chip } from '@mui/material';
import { ComponentType } from 'react';
import { GoClock } from 'react-icons/go';
import { RiProgress5Line } from 'react-icons/ri';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';

type TAppointmentStatusConfig = {
    label: TAppointmentStatus;
    color: string;
    icon: ComponentType<{ size: number; color: string }>;
};

export const appointmentStatusConfigs: TAppointmentStatusConfig[] = [
    {
        label: 'SCHEDULED',
        icon: GoClock,
        color: '#2cad75',
    },
    {
        label: 'IN_PROGRESS',
        icon: RiProgress5Line,
        color: '#cc6e2e',
    },
    {
        label: 'COMPLETED',
        icon: IoMdCheckmarkCircleOutline,
        color: '#689fe9',
    },
    {
        label: 'CANCELED',
        icon: MdOutlineCancel,
        color: '#d05e5e',
    },
];

const AppointmentChip = ({ label }: { label: TAppointmentStatus }) => {
    const config = appointmentStatusConfigs.find(
        (config) => config.label === label,
    );

    if (!config) {
        return null;
    }

    const { icon: Icon, color } = config;

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

export default AppointmentChip;
