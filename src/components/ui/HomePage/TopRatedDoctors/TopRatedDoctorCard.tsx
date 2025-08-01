import { TDoctor } from '@/types';
import getProfilePhotoOrAvatar from '@/utils/getProfilePhotoOrAvatar';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';

const TopRatedDoctorCard = ({ doctor }: { doctor: TDoctor }) => {
    return (
        <Grid
            key={doctor.id}
            size={{ xs: 12, md: 4 }}
            sx={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                overflow: 'hidden',
            }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Image
                        src={getProfilePhotoOrAvatar(
                            doctor.profilePhoto,
                            doctor.gender,
                        )}
                        alt={doctor.name}
                        height={200}
                        width={200}
                        style={{
                            width: '100%',
                            height: '288px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h6" fontWeight={600}>
                        {doctor.name}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary' }}>
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
                            style={{
                                paddingTop: '4px',
                            }}
                        />{' '}
                        <Typography>{doctor.currentWorkingPlace}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        color="gray"
                        gap={0.5}
                        alignItems="start"
                    >
                        <TbCurrencyTaka
                            size={20}
                            style={{
                                paddingTop: '4px',
                            }}
                        />{' '}
                        <Typography>
                            Appointment Fee: &#2547; {doctor.appointmentFee}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions
                    sx={{
                        padding: 2,
                    }}
                >
                    <Button
                        component={Link}
                        href={`/doctors/${doctor.id}`}
                        sx={{
                            width: '50%',
                        }}
                    >
                        Book Now
                    </Button>
                    <Button
                        component={Link}
                        href={`/doctors/${doctor.id}`}
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
    );
};

export default TopRatedDoctorCard;
