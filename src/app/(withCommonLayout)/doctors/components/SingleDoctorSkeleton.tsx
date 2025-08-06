import { Grid, Skeleton, Stack } from '@mui/material';

const SingleDoctorSkeleton = () => {
    return (
        <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: '0.5s',
                padding: 2,
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                spacing={2}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        borderRadius: '3px',
                        height: '100px',
                        width: '100px',
                    }}
                />

                <Stack
                    direction="column"
                    alignItems={{ xs: 'center', sm: 'flex-start' }}
                    flexGrow={1}
                >
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.7rem', width: 200 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', width: 100 }}
                    />

                    <Stack
                        direction="row"
                        spacing={1}
                        mt={0.5}
                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    >
                        {Array(2)
                            .fill(null)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', width: 80 }}
                                />
                            ))}
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems={{ xs: 'center', sm: 'flex-end' }}
                >
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', width: 50 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.1rem', width: 70 }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.2rem', width: 100 }}
                    />
                </Stack>
            </Stack>
        </Grid>
    );
};

export default SingleDoctorSkeleton;
