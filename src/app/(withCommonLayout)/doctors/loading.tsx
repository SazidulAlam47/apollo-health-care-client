import {
    Box,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import DashedLine from '@/components/Styled/DashedLine';
import SingleDoctorSkeleton from './components/SingleDoctorSkeleton';

const DoctorsLoadingPage = () => {
    return (
        <Container>
            <DashedLine />
            <Stack direction="column" spacing={3}>
                <Box textAlign="center">
                    <Typography
                        variant="h4"
                        component="h4"
                        fontSize={{ xs: 30, md: 33 }}
                        fontWeight={600}
                    >
                        Our Doctors
                    </Typography>
                    <Typography color="gray" maxWidth={500} margin="auto">
                        Meet the Medical Minds Behind Your Health, Dedicated
                        Experts Who Combine Compassion, Skill and Innovation to
                        Guide Your Care
                    </Typography>
                </Box>

                <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={3}
                    marginY={5}
                >
                    {Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="text"
                                sx={{ fontSize: '1.8rem', width: 80 }}
                            />
                        ))}
                </Stack>
                <Grid container spacing={2}>
                    {Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <SingleDoctorSkeleton key={index} />
                        ))}
                </Grid>
            </Stack>
        </Container>
    );
};

export default DoctorsLoadingPage;
