import { TDoctor } from '@/types';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import SingleDoctor from './components/SingleDoctor';
import DashedLine from '@/components/Styled/DashedLine';
import SpecialtiesTab from './components/SpecialtiesTab';

const DoctorsPage = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: doctors } = await res.json();

    return (
        <Container>
            <DashedLine />
            <Stack direction="column" spacing={3}>
                <Box textAlign="center">
                    <Typography variant="h4" component="h4" fontWeight={600}>
                        Our Doctors
                    </Typography>
                    <Typography color="gray" maxWidth={500} margin="auto">
                        Meet the Medical Minds Behind Your Health, Dedicated
                        Experts Who Combine Compassion, Skill and Innovation to
                        Guide Your Care
                    </Typography>
                </Box>
                <SpecialtiesTab />
                <Grid container spacing={2}>
                    {doctors.map((doctor: TDoctor) => (
                        <SingleDoctor key={doctor.id} doctor={doctor} />
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};

export default DoctorsPage;
