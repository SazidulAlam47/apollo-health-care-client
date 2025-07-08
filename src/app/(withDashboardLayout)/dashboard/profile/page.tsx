'use client';

import Loader from '@/components/shared/Loader/Loader';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Stack,
} from '@mui/material';
import ProfileField from './components/ProfileField';
import capitalize from '@/utils/capitalize';

const ProfilePage = () => {
    const { data: user, isLoading } = useGetSingleUserQuery({});

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

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Card sx={{ maxWidth: 600, width: '100%', p: 3, boxShadow: 3 }}>
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
                <Divider sx={{ mb: 2 }} />
                <CardContent>
                    <Grid container spacing={2}>
                        <ProfileField
                            label="Contact Number"
                            value={user.contactNumber}
                        />
                        <ProfileField label="Address" value={user.address} />
                        <ProfileField
                            label="Gender"
                            value={user.gender ? capitalize(user.gender) : null}
                        />
                        <ProfileField
                            label="Role"
                            value={
                                user.role === 'SUPER_ADMIN'
                                    ? 'Super Admin'
                                    : capitalize(user.role)
                            }
                        />
                        <ProfileField
                            label="Registration No."
                            value={user.registrationNumber}
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
                            label="Qualification"
                            value={user.qualification}
                        />
                        <ProfileField
                            label="Current Workplace"
                            value={user.currentWorkingPlace}
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
