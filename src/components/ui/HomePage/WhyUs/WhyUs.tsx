import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import chooseUsImg from '@/assets/choose-us.png';
import Image from 'next/image';
import servicesData from './servicesData';

const WhyUs = () => {
    return (
        <Container
            sx={{
                my: 10,
            }}
        >
            <Stack spacing={3}>
                <Box textAlign="center">
                    <Typography
                        color="primary"
                        variant="h6"
                        component="h6"
                        fontWeight={700}
                    >
                        Why Us
                    </Typography>
                    <Typography variant="h4" component="h4" fontWeight={700}>
                        Why Choose Us
                    </Typography>
                </Box>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
                        <Stack spacing={1.5}>
                            {servicesData.map((service, index) => (
                                <Stack
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    gap={3}
                                    padding={3}
                                    borderRadius={
                                        index % 2
                                            ? '20px 90px 20px 20px'
                                            : '20px 20px 90px 20px'
                                    }
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    <Stack
                                        padding={1.5}
                                        borderRadius={2}
                                        height={70}
                                        width={70}
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <Image
                                            src={service.imageSrc}
                                            alt="service icon"
                                        />
                                    </Stack>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            component="h6"
                                            fontWeight={600}
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="gray"
                                            fontWeight={300}
                                            maxWidth={400}
                                        >
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                        <Box>
                            <Image
                                src={chooseUsImg}
                                alt="choose us"
                                width={450}
                                style={{
                                    margin: '0 auto',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default WhyUs;
