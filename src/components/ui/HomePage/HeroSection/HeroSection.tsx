import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import assets from '@/assets';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <Container
            sx={{
                my: 16,
            }}
        >
            <Grid container alignItems="center" spacing={3}>
                <Grid
                    size={{ xs: 12, md: 6 }}
                    position="relative"
                    sx={{
                        backgroundImage: 'url("/svg/grid.svg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    order={{ xs: 2, md: 1 }}
                >
                    <Stack spacing={2}>
                        <Typography
                            component="h3"
                            variant="h2"
                            fontSize={{ xs: 40, md: 60 }}
                            fontWeight={600}
                        >
                            Healthier Hearts Come From{' '}
                            <Box component="span" color="primary.main">
                                Preventive Care
                            </Box>
                        </Typography>
                        <Typography color="gray">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit- Fugit eum iusto consequatur eius, doloribus
                            nesciunt facere aliquid eveniet et. Rerum maiores
                            saepe cupiditate repellat recusandae atque sed.
                            Saepe. vitae id?
                        </Typography>
                        <Stack direction="row" gap={3}>
                            <Button>Make Appointment</Button>
                            <Button variant="outlined">Contact Us</Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                    <Image
                        src={assets.images.hero}
                        alt="hero"
                        style={{
                            width: '100%',
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroSection;
