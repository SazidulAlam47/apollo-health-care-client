import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import howItWorksImg from '@/assets/how-it-works-img.png';
import solutionsData from './solutionsData';

const HowItWorks = () => {
    return (
        <Container
            sx={{
                my: 10,
            }}
        >
            <Stack spacing={5}>
                <Stack spacing={0.5}>
                    <Typography
                        color="primary"
                        variant="h6"
                        component="h6"
                        fontWeight={700}
                    >
                        How it Works
                    </Typography>
                    <Typography variant="h4" component="h4" fontWeight={700}>
                        4 Easy Steps to Get Your Solution
                    </Typography>
                    <Typography
                        variant="body1"
                        color="gray"
                        fontWeight={300}
                        fontSize={17}
                        maxWidth={550}
                    >
                        Access to expert physicians and surgeons, advanced
                        technologies and top-quality surgery facilities right
                        here.
                    </Typography>
                </Stack>
                <Grid container alignItems="center" spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Image
                                src={howItWorksImg}
                                alt="how it works"
                                style={{
                                    margin: '0 auto',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={2}>
                            {solutionsData.map((solution, index) => (
                                <Grid
                                    size={{ xs: 12, md: 6 }}
                                    key={index}
                                    padding={3}
                                    borderRadius={3}
                                    sx={{
                                        border: '1px solid #ddd',
                                        transition: '0.5s',
                                        ':hover': {
                                            border: '1px solid #0e82fd',
                                        },
                                    }}
                                >
                                    <Stack spacing={1.5}>
                                        <Box>
                                            <Image
                                                src={solution.imageSrc}
                                                alt="solution"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            component="h5"
                                            fontWeight={500}
                                            fontSize={22}
                                        >
                                            {solution.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="gray"
                                            fontWeight={300}
                                            fontSize={15}
                                        >
                                            {solution.description}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default HowItWorks;
