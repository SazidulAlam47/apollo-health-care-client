'use client';
import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-icon.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const [resetPassword] = useResetPasswordMutation();
    const router = useRouter();

    const handleForgot = async (values: FieldValues) => {
        const payload = {
            data: {
                id: searchParams.id,
                password: values.password,
            },
            token: searchParams.token,
        };

        const toastId = toast.loading('Changing Password...');
        try {
            await resetPassword(payload).unwrap();
            toast.success('Password Changed', { id: toastId });
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Container>
            <Stack
                minHeight="100dvh"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    boxShadow={1}
                    padding={{ xs: 2.5, md: 4 }}
                    my={2}
                    borderRadius={2}
                    spacing={2}
                    maxWidth={600}
                    width="100%"
                    textAlign="center"
                >
                    <Box component={Link} href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={50}
                            height={50}
                            style={{
                                margin: '0 auto',
                                width: '50px',
                                height: '50px',
                            }}
                        />
                    </Box>
                    <Typography variant="h5" component="h5" fontWeight={600}>
                        Reset Password
                    </Typography>
                    <HFrom
                        onSubmit={handleForgot}
                        resolver={zodResolver(resetPasswordSchema)}
                    >
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <HInput
                                    label="New Password"
                                    type="password"
                                    name="password"
                                />
                            </Grid>
                            <Grid size={12}>
                                <HInput
                                    label="Confirm New Password"
                                    type="password"
                                    name="confirmPassword"
                                />
                            </Grid>

                            <Grid size={12}>
                                <Button type="submit" fullWidth>
                                    Change Password
                                </Button>
                            </Grid>
                        </Grid>
                    </HFrom>
                </Stack>
            </Stack>
        </Container>
    );
};

export default ResetPasswordPage;
