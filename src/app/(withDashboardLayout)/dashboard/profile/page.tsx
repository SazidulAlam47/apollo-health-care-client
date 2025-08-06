'use client';

import Loader from '@/components/shared/Loader/Loader';
import { useGetUserInfoQuery } from '@/redux/api/userApi';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Stack,
    Button,
} from '@mui/material';
import ProfileField from './components/ProfileField';
import capitalize from '@/utils/capitalize';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';

const ProfilePage = () => {
    const { data: user, isLoading } = useGetUserInfoQuery({});

    if (isLoading) {
        return <Loader />;
    }

    if (!user) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Typography color="error">User not found</Typography>
            </Box>
        );
    }

    const doctorSpecialtiesString =
        user.role === 'DOCTOR' && user?.doctorSpecialties?.length
            ? user?.doctorSpecialties
                  .map((doctorSpecialty) => doctorSpecialty.specialties.title)
                  .join(', ')
            : null;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Card
                sx={{
                    maxWidth: 600,
                    width: '100%',
                    p: { sx: 0, md: 3 },
                    boxShadow: { xs: 0, md: 3 },
                    borderRadius: '10px',
                }}
            >
                <Stack direction="column" alignItems="center" mb={2}>
                    <Avatar
                        src={user.profilePhoto || undefined}
                        alt={user.name || user.email}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />

                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {user.name || 'User'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.email}
                    </Typography>
                </Stack>
                {!(user.role === 'SUPER_ADMIN') && (
                    <Box textAlign={{ xs: 'center', sm: 'right' }}>
                        <Button
                            component={Link}
                            href="/dashboard/profile/edit"
                            size="small"
                            sx={{ mb: 2, px: '15px', py: '6px' }}
                            startIcon={<MdEdit />}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                )}
                <Divider sx={{ mb: 2 }} />
                <CardContent>
                    <Grid container spacing={2}>
                        <ProfileField
                            label="Contact Number"
                            value={user.contactNumber}
                        />
                        <ProfileField label="Address" value={user.address} />
                        {user.role === 'DOCTOR' && (
                            <>
                                <ProfileField
                                    label="Gender"
                                    value={
                                        user.gender
                                            ? capitalize(user.gender)
                                            : null
                                    }
                                />

                                <ProfileField
                                    label="Registration No."
                                    value={user.registrationNumber}
                                />
                                <ProfileField
                                    label="Qualification"
                                    value={user.qualification}
                                />
                                <ProfileField
                                    label="Current Workplace"
                                    value={user.currentWorkingPlace}
                                />
                                <ProfileField
                                    label="Experience"
                                    value={
                                        user.experience
                                            ? `${user.experience} years`
                                            : undefined
                                    }
                                />
                                <ProfileField
                                    label="Appointment Fee"
                                    value={
                                        user.appointmentFee
                                            ? `${user.appointmentFee} tk`
                                            : undefined
                                    }
                                />
                                <ProfileField
                                    label="Designation"
                                    value={user.designation}
                                />
                                <ProfileField
                                    label="Average Rating"
                                    value={
                                        user.averageRating !== undefined
                                            ? user.averageRating
                                            : undefined
                                    }
                                />

                                <ProfileField
                                    label="Specialties"
                                    value={doctorSpecialtiesString}
                                    fullWidth
                                />
                            </>
                        )}

                        {user.role === 'PATIENT' && user.patientHealthData && (
                            <>
                                <ProfileField
                                    label="Date of Birth"
                                    value={
                                        user.patientHealthData.dateOfBirth
                                            ? new Date(
                                                  user.patientHealthData.dateOfBirth,
                                              ).toLocaleDateString()
                                            : undefined
                                    }
                                />

                                <ProfileField
                                    label="Gender"
                                    value={
                                        user.patientHealthData.gender
                                            ? capitalize(
                                                  user.patientHealthData.gender,
                                              )
                                            : undefined
                                    }
                                />

                                <ProfileField
                                    label="Blood Group"
                                    value={
                                        user.patientHealthData.bloodGroup
                                            ? user.patientHealthData.bloodGroup.replace(
                                                  '_',
                                                  ' ',
                                              )
                                            : undefined
                                    }
                                />

                                <ProfileField
                                    label="Marital Status"
                                    value={
                                        user.patientHealthData.maritalStatus
                                            ? capitalize(
                                                  user.patientHealthData
                                                      .maritalStatus,
                                              )
                                            : undefined
                                    }
                                />
                                {user.patientHealthData.gender === 'FEMALE' &&
                                    user.patientHealthData.maritalStatus ===
                                        'MARRIED' && (
                                        <ProfileField
                                            label="Pregnancy Status"
                                            fullWidth
                                            value={
                                                user.patientHealthData
                                                    .pregnancyStatus
                                                    ? 'Yes'
                                                    : 'No'
                                            }
                                        />
                                    )}
                                <ProfileField
                                    label="Height"
                                    value={user.patientHealthData.height}
                                />

                                <ProfileField
                                    label="Weight"
                                    value={user.patientHealthData.weight}
                                />

                                <ProfileField
                                    label="Dietary Preferences"
                                    value={
                                        user.patientHealthData
                                            .dietaryPreferences
                                    }
                                />

                                <ProfileField
                                    label="Mental Health History"
                                    value={
                                        user.patientHealthData
                                            .mentalHealthHistory
                                    }
                                />

                                <ProfileField
                                    label="Immunization Status"
                                    value={
                                        user.patientHealthData
                                            .immunizationStatus
                                    }
                                />

                                <ProfileField
                                    label="Has Allergies"
                                    value={
                                        user.patientHealthData.hasAllergies
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />

                                <ProfileField
                                    label="Has Diabetes"
                                    value={
                                        user.patientHealthData.hasDiabetes
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />

                                <ProfileField
                                    label="Smoking Status"
                                    value={
                                        user.patientHealthData.smokingStatus
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />

                                <ProfileField
                                    label="Has Past Surgeries"
                                    value={
                                        user.patientHealthData.hasPastSurgeries
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />

                                <ProfileField
                                    label="Recent Anxiety"
                                    value={
                                        user.patientHealthData.recentAnxiety
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />

                                <ProfileField
                                    label="Recent Depression"
                                    value={
                                        user.patientHealthData.recentDepression
                                            ? 'Yes'
                                            : 'No'
                                    }
                                />
                            </>
                        )}
                        <ProfileField
                            label="Role"
                            value={
                                user.role === 'SUPER_ADMIN'
                                    ? 'Super Admin'
                                    : capitalize(user.role)
                            }
                        />
                        <ProfileField
                            label="Joined"
                            value={
                                user.createdAt
                                    ? new Date(
                                          user.createdAt,
                                      ).toLocaleDateString()
                                    : undefined
                            }
                        />
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;
