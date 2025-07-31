import { TDoctor } from '@/types';
import getProfilePhotoOrAvatar from '@/utils/getProfilePhotoOrAvatar';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const SingleDoctor = ({ doctor }: { doctor: TDoctor }) => {
    return (
        <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: '0.5s',
                padding: 2,
                '&:hover': {
                    borderColor: '#1586FD',
                },
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                textAlign={{ xs: 'center', sm: 'left' }}
                spacing={2}
            >
                <Box>
                    <Box
                        sx={{
                            borderRadius: '3px',
                            overflow: 'hidden',
                            height: '100px',
                            width: '100px',
                            mx: { xs: 'auto', sm: 'inherit' },
                            '& img': {
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            },
                        }}
                    >
                        <Image
                            src={getProfilePhotoOrAvatar(
                                doctor.profilePhoto,
                                doctor.gender,
                            )}
                            alt={doctor.name}
                            width={100}
                            height={100}
                        />
                    </Box>
                </Box>
                <Stack direction="column" flexGrow={1}>
                    <Typography variant="h6" component="h6" fontWeight={600}>
                        {doctor.name}
                    </Typography>
                    <Typography color="gray">{doctor.qualification}</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        mt={0.5}
                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    >
                        {doctor.doctorSpecialties?.map((doctorSpecialty) => (
                            <Chip
                                key={doctorSpecialty.specialitiesId}
                                label={doctorSpecialty.specialties.title}
                                color="primary"
                                size="small"
                            />
                        ))}
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    textAlign={{ xs: 'center', sm: 'right' }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        justifyContent={{ xs: 'center', sm: 'flex-end' }}
                    >
                        <FaStar color="#f7b033" />
                        <Typography color="gray">
                            {doctor.averageRating}
                        </Typography>
                    </Stack>
                    <Typography color="gray">
                        &#2547; {doctor.appointmentFee}
                    </Typography>
                    <Button
                        component={Link}
                        href={`/doctors/${doctor.id}`}
                        variant="text"
                        size="small"
                        sx={{
                            padding: '3px 8px',
                        }}
                    >
                        View Profile
                    </Button>
                </Stack>
            </Stack>
        </Grid>
    );
};

export default SingleDoctor;
