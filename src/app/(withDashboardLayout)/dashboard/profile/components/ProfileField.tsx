import { Grid, Typography } from '@mui/material';

type TProfileFieldProps = {
    label: string;
    value: any;
    fullWidth?: boolean;
};

const ProfileField = ({
    label,
    value,
    fullWidth = false,
}: TProfileFieldProps) => {
    if (!value) return null;
    return (
        <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1">{value}</Typography>
        </Grid>
    );
};

export default ProfileField;
