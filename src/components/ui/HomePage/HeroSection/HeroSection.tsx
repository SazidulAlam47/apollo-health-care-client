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
            <Box position="relative" className="space-y-5">
                <Typography component="h2" variant="h2" fontWeight={600}>
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
                <Box
                    position="absolute"
                    width={700}
                    top={-150}
                    left={-120}
                    zIndex={-1}
                >
                    <Image src={assets.svgs.grid} alt="grid" />
                </Box>
            </Box>
            <Stack justifyContent="center" position="relative">
                <Box position="absolute" left={200} top={-30}>
                    <Image
                        src={assets.svgs.arrow}
                        alt="arrow"
                        height={100}
                        width={100}
                    />
                </Box>
                <Stack direction="row" gap={1}>
                    <Box mt={4}>
                        <Image src={assets.images.doctor1} alt="doctor1" />
                    </Box>
                    <Box>
                        <Image src={assets.images.doctor2} alt="doctor2" />
                    </Box>
                </Stack>
                <Box position="absolute" top={250} left={150}>
                    <Image
                        src={assets.images.doctor3}
                        alt="doctor3"
                        height={300}
                    />
                </Box>
                <Box position="absolute" bottom={-70} right={-80} zIndex={-1}>
                    <Image
                        src={assets.images.stethoscope}
                        alt="doctor3"
                        height={240}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

export default HeroSection;
