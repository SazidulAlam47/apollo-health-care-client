import { TSpecialty } from '@/types';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import SingleSpecialty from './SingleSpecialty';
import Link from 'next/link';

const Specialties = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties?limit=6`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: specialties } = await res.json();

    return (
        <Container sx={{ my: 8 }}>
            <Stack spacing={3}>
                <Box textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography variant="h4" component="h4" fontWeight={600}>
                        Explore Treatments across specialties
                    </Typography>
                    <Typography color="gray">
                        Find experienced doctors across all specialties
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {specialties.map((specialty: TSpecialty) => (
                        <SingleSpecialty
                            key={specialty.id}
                            specialty={specialty}
                        />
                    ))}
                </Grid>
                <Box textAlign="center">
                    <Button
                        component={Link}
                        href="/specialties"
                        variant="outlined"
                    >
                        View All
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};

export default Specialties;
