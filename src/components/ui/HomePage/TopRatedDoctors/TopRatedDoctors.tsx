import { TDoctor } from '@/types';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';

const TopRatedDoctors = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors?limit=3&sortBy=averageRating&sortOrder=desc`,
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: doctors } = await res.json();

    return (
        <Box
            sx={{
                my: { xs: 5, md: 10 },
                py: { xs: 10, md: 30 },
                backgroundColor: '#e7e7e7',
                clipPath: {
                    xs: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    md: 'polygon(0 0, 100% 25%, 100% 100%, 0 75%)',
                },
            }}
        >
            <Container className="space-y-5">
                <Box textAlign="center">
                    <Typography variant="h4" component="h4" fontWeight={600}>
                        Our Top Rated Doctors
                    </Typography>
                    <Typography color="gray" maxWidth={500} margin="auto">
                        Access to expert physicians and surgeons, advanced
                        technologies and top-quality surgery facilities right
                        here.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {doctors.map((doctor: TDoctor) => (
                        <Grid
                            key={doctor.id}
                            size={{ xs: 12, md: 4 }}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Card>
                                <Box
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Image
                                        src={doctor.profilePhoto}
                                        alt={doctor.name}
                                        height={200}
                                        width={200}
                                        className="w-full h-72 object-cover"
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        fontWeight={600}
                                    >
                                        {doctor.name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {doctor.qualification}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        color="gray"
                                        gap={1}
                                        alignItems="start"
                                    >
                                        <IoLocationOutline
                                            size={20}
                                            className="pt-1"
                                        />{' '}
                                        <Typography>
                                            {doctor.address}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        color="gray"
                                        gap={0.5}
                                        alignItems="start"
                                    >
                                        <TbCurrencyTaka
                                            size={20}
                                            className="pt-1"
                                        />{' '}
                                        <Typography>
                                            Appointment Fee: &#2547;{' '}
                                            {doctor.appointmentFee}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        padding: 2,
                                    }}
                                >
                                    <Button
                                        sx={{
                                            width: '50%',
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: '50%',
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box textAlign="center">
                    <Button variant="outlined">View All Doctors</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;
