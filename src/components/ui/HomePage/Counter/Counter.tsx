import { Container, Grid, Typography } from '@mui/material';

const Counter = () => {
    return (
        <Container>
            <Grid
                container
                spacing={3}
                textAlign="center"
                sx={{
                    my: 12,
                    backgroundImage: 'linear-gradient(45deg,blue, cyan)',
                    color: '#fff',
                    padding: 5,
                    borderRadius: '20px',
                }}
            >
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="h3" component="h5">
                        180+
                    </Typography>
                    <Typography>Expert Doctors</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="h3" component="h5">
                        26+
                    </Typography>
                    <Typography>Expert Services</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="h3" component="h5">
                        10K+
                    </Typography>
                    <Typography>Happy Patients</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="h3" component="h5">
                        150+
                    </Typography>
                    <Typography>Best Award Winners</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Counter;
