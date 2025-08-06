import DashedLine from '@/components/Styled/DashedLine';
import { Box, Container, Skeleton, Stack } from '@mui/material';

const DoctorDetailsLoadingPage = () => {
    return (
        <Container>
            <DashedLine />
            <Stack direction={{ sx: 'column', md: 'row' }} gap={2}>
                <Skeleton
                    variant="rectangular"
                    sx={{
                        borderRadius: '3px',
                        height: '250px',
                        width: '250px',
                    }}
                />
                <Stack direction="column" flexGrow={1} spacing={1}>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.7rem', maxWidth: 200 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', maxWidth: 350 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', maxWidth: 300 }}
                    />

                    <Stack
                        direction="row"
                        spacing={1}
                        mt={0.5}
                        justifyContent="flex-start"
                    >
                        {Array(2)
                            .fill(null)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', maxWidth: 80 }}
                                />
                            ))}
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={4}
                        my={2}
                    >
                        {Array(3)
                            .fill(null)
                            .map((_, index) => (
                                <Stack
                                    direction="column"
                                    alignItems={{
                                        xs: 'flex-start',
                                        sm: 'center',
                                    }}
                                    key={index}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: '1.1rem',
                                            maxWidth: 100,
                                        }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: '1.1rem',
                                            maxWidth: 60,
                                        }}
                                    />
                                </Stack>
                            ))}
                    </Stack>

                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', maxWidth: 450 }}
                    />

                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', maxWidth: 500 }}
                    />
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    textAlign={{ xs: 'left', md: 'center' }}
                >
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.7rem', maxWidth: 200 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '3.5rem', maxWidth: 200 }}
                    />
                </Stack>
            </Stack>
            <Box>
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '3.5rem', maxWidth: 220 }}
                />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.1rem', maxWidth: 200 }}
                />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.1rem', maxWidth: 250 }}
                />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', maxWidth: 180 }}
                />
            </Box>
        </Container>
    );
};

export default DoctorDetailsLoadingPage;
