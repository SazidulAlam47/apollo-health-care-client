'use client';

import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { changePasswordSchema } from '@/schemas/auth.schema';
import { userLogout } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { IoMdKey } from 'react-icons/io';
import { toast } from 'sonner';

const ChangePasswordPage = () => {
    const [changePassword] = useChangePasswordMutation();
    const router = useRouter();

    const handleChangePassword = async (data: FieldValues) => {
        const toastId = toast.loading('Changing Password...');
        try {
            await changePassword(data).unwrap();
            toast.success('Password Changed successfully', { id: toastId });
            await userLogout();
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Stack
                sx={{
                    maxWidth: 600,
                    width: '100%',
                    p: { sx: 0, md: 3 },
                    boxShadow: { xs: 0, md: 3 },
                    borderRadius: '10px',
                }}
                spacing={3}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <IoMdKey size={50} color="gray" />
                    <Typography variant="h5" component="h5" fontWeight={600}>
                        Change Password
                    </Typography>
                </Box>
                <HFrom
                    onSubmit={handleChangePassword}
                    resolver={zodResolver(changePasswordSchema)}
                >
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <HInput
                                label="Old Password"
                                type="password"
                                name="oldPassword"
                                size="small"
                            />
                        </Grid>
                        <Grid size={12}>
                            <HInput
                                label="New Password"
                                type="password"
                                name="newPassword"
                                size="small"
                            />
                        </Grid>
                        <Grid size={12}>
                            <Button type="submit" fullWidth>
                                Change password
                            </Button>
                        </Grid>
                    </Grid>
                </HFrom>
            </Stack>
        </Box>
    );
};

export default ChangePasswordPage;
