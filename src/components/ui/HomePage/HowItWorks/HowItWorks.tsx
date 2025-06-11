import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import howItWorksImg from '@/assets/how-it-works-img.png';
import solutionsData from './solutionsData';

const HowItWorks = () => {
    return (
        <Container className="space-y-10 my-20">
            <Box className="space-y-0.5">
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
                    technologies and top-quality surgery facilities right here.
                </Typography>
            </Box>
            <Grid container alignItems="center" spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                        <Image
                            src={howItWorksImg}
                            alt="how it works"
                            className="mx-auto"
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
                                className="space-y-3"
                                sx={{
                                    border: '1px solid #ddd',
                                    transition: '0.5s',
                                    ':hover': {
                                        border: '1px solid #0e82fd',
                                    },
                                }}
                            >
                                <Box>
                                    <Image
                                        src={solution.imageSrc}
                                        alt="solution"
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
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HowItWorks;
