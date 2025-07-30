import DashedLine from '@/components/Styled/DashedLine';
import { TDoctor } from '@/types';
import getProfilePhotoOrAvatar from '@/utils/getProfilePhotoOrAvatar';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const DoctorDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors/${id}`,
        {
            cache: 'no-store',
        },
    );

    const { data } = await res.json();

    const doctor = data as TDoctor;

    return (
        <Container>
            <DashedLine />
            <Stack direction="row" spacing={2} mt={3}>
                <Box
                    sx={{
                        borderRadius: '3px',
                        overflow: 'hidden',
                        height: '250px',
                        width: '250px',
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
                        width={500}
                        height={500}
                    />
                </Box>
                <Stack direction="column" flexGrow={1} spacing={1}>
                    <Typography variant="h5" component="h5" fontWeight={600}>
                        {doctor.name}
                    </Typography>
                    <Typography color="gray">{doctor.designation}</Typography>
                    <Typography color="gray">{doctor.qualification}</Typography>
                    <Stack direction="row" spacing={1} mt={0.5}>
                        {doctor.doctorSpecialties?.map((doctorSpecialty) => (
                            <Chip
                                key={doctorSpecialty.specialitiesId}
                                label={doctorSpecialty.specialties.title}
                                color="primary"
                                size="small"
                            />
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={2} my={2}>
                        <Box
                            sx={{
                                borderRight: '1px dashed #ddd',
                                paddingRight: 2,
                            }}
                        >
                            <Typography color="#4b5563">
                                Total Experience
                            </Typography>
                            <Typography
                                color="#09090b"
                                fontWeight={600}
                                textAlign="center"
                            >
                                {doctor.experience} years
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                borderRight: '1px dashed #ddd',
                                paddingRight: 2,
                            }}
                        >
                            <Typography color="#4b5563">
                                Registration Number
                            </Typography>
                            <Typography
                                color="#09090b"
                                fontWeight={600}
                                textAlign="center"
                            >
                                {doctor.registrationNumber}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color="#4b5563">
                                Total Rating
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                justifyContent="center"
                            >
                                <FaStar color="#f7b033" />
                                <Typography color="gray">
                                    {doctor.averageRating}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Typography color="gray">
                        <Typography
                            component="span"
                            color="#626262ff"
                            fontWeight={600}
                        >
                            Current Working Place:
                        </Typography>{' '}
                        {doctor.currentWorkingPlace}
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    textAlign="center"
                >
                    <Typography
                        component="h5"
                        variant="h5"
                        color="#09090b"
                        fontWeight={600}
                    >
                        Consultation Fee
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography color="primary" fontSize={40}>
                            &#2547; {doctor.appointmentFee}
                        </Typography>
                        <Typography color="gray" fontSize={20}>
                            (Inc. VAT)
                        </Typography>
                    </Stack>

                    <Button
                        sx={{
                            padding: '5px 10px',
                        }}
                    >
                        Book Appointment
                    </Button>
                </Stack>
            </Stack>
            <Box mt={3}>
                <Typography
                    variant="h6"
                    component="h6"
                    fontWeight={600}
                    color="#09090b"
                    gutterBottom
                >
                    Contact Information
                </Typography>
                <Typography color="gray">
                    <Typography
                        component="span"
                        color="#626262ff"
                        fontWeight={600}
                    >
                        Email:
                    </Typography>{' '}
                    {doctor.email}
                </Typography>
                <Typography color="gray">
                    <Typography
                        component="span"
                        color="#626262ff"
                        fontWeight={600}
                    >
                        Contact Number:
                    </Typography>{' '}
                    {doctor.contactNumber}
                </Typography>
                {doctor.address && (
                    <Typography color="gray">
                        <Typography
                            component="span"
                            color="#626262ff"
                            fontWeight={600}
                        >
                            Address:
                        </Typography>{' '}
                        {doctor.address}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default DoctorDetailsPage;
