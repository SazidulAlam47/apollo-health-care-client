import { Grid, Typography } from '@mui/material';

const ProfileField = ({ label, value }: { label: string; value: any }) => {
    if (!value) return null;
    return (
        <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1">{value}</Typography>
        </Grid>
    );
};

export default ProfileField;
