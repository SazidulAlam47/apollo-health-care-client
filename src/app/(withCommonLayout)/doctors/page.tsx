import { TDoctor } from '@/types';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import SingleDoctor from './components/SingleDoctor';
import DashedLine from '@/components/Styled/DashedLine';
import SpecialtiesTab from './components/SpecialtiesTab';
import DoctorPagination from './components/DoctorPagination';

const DoctorsPage = async ({
    searchParams,
}: {
    searchParams: { specialties: string; page: string };
}) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors?limit=10${
            searchParams.page ? `&page=${searchParams.page}` : ''
        }${
            searchParams.specialties
                ? `&specialties=${searchParams.specialties}`
                : ''
        }`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: doctors, meta } = await res.json();

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
                <Box mb={3}>
                    <DoctorPagination meta={meta} />
                </Box>
            </Stack>
        </Container>
    );
};

export default DoctorsPage;
