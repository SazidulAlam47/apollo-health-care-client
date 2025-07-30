import DashedLine from '@/components/Styled/DashedLine';
import SingleSpecialty from '@/components/ui/HomePage/Specialties/SingleSpecialty';
import { TSpecialty } from '@/types';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const SpecialtiesPage = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: specialties } = await res.json();

    return (
        <Container>
            <DashedLine />
            <Stack direction="column" spacing={3}>
                <Box textAlign="center">
                    <Typography variant="h4" component="h4" fontWeight={600}>
                        Explore Treatments across specialties
                    </Typography>
                    <Typography color="gray" maxWidth={500} margin="auto">
                        Find experienced doctors across all specialties
                    </Typography>
                </Box>
            </Stack>
            <Grid container spacing={2} mt={3}>
                {specialties.map((specialty: TSpecialty) => (
                    <SingleSpecialty key={specialty.id} specialty={specialty} />
                ))}
            </Grid>
        </Container>
    );
};

export default SpecialtiesPage;
