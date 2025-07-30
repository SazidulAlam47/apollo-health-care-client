import { TDoctor } from '@/types';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import TopRatedDoctorCard from './TopRatedDoctorCard';
import Link from 'next/link';

const TopRatedDoctors = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors?limit=3&sortBy=averageRating&sortOrder=desc`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: doctors } = await res.json();

    return (
        <Box
            sx={{
                my: { xs: 5, md: 10 },
                py: { xs: 10, md: 30 },
                backgroundColor: '#e7e7e7',
                clipPath: {
                    xs: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    md: 'polygon(0 0, 100% 25%, 100% 100%, 0 75%)',
                },
            }}
        >
            <Container>
                <Stack spacing={3}>
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            component="h4"
                            fontWeight={600}
                        >
                            Our Top Rated Doctors
                        </Typography>
                        <Typography color="gray" maxWidth={500} margin="auto">
                            Access to expert physicians and surgeons, advanced
                            technologies and top-quality surgery facilities
                            right here.
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {doctors.map((doctor: TDoctor) => (
                            <TopRatedDoctorCard
                                key={doctor.id}
                                doctor={doctor}
                            />
                        ))}
                    </Grid>
                    <Box textAlign="center">
                        <Button
                            component={Link}
                            href="/doctors"
                            variant="outlined"
                        >
                            View All Doctors
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;
