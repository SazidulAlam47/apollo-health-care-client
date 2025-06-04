import { Box, Button, Container, Stack, Typography } from '@mui/material';
import assets from '@/assets';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <Container
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, 1fr)',
                },
                my: 16,
                alignItems: 'center',
            }}
        >
            <Box
                position="relative"
                className="space-y-5"
                sx={{
                    backgroundImage: `url('/svg/grid.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit-
                    Fugit eum iusto consequatur eius, doloribus nesciunt facere
                    aliquid eveniet et. Rerum maiores saepe cupiditate repellat
                    recusandae atque sed. Saepe. vitae id?
                </Typography>
                <Stack direction="row" gap={3}>
                    <Button>Make Appointment</Button>
                    <Button variant="outlined">Contact Us</Button>
                </Stack>
            </Box>
            <Box>
                <Image src={assets.images.hero} alt="hero" className="w-full" />
            </Box>
        </Container>
    );
};

export default HeroSection;
