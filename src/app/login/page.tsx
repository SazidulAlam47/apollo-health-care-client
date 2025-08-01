'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { storeUserInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import HFrom, { TUFromFncRef } from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth.schema';
import getRoleLowerCase from '@/utils/getRoleLowerCase';
import { useLoginMutation } from '@/redux/api/authApi';
import { useRef } from 'react';
import {
    adminLogin,
    defaultLogin,
    doctorLogin,
    patientLogin,
    superAdminLogin,
} from '@/constants/credentials';

const LoginPage = () => {
    const router = useRouter();
    const [login] = useLoginMutation();
    const formRef = useRef<TUFromFncRef>(null);

    const handleLogin = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in...');
        try {
            const res = await login(data).unwrap();

            if (res.accessToken) {
                storeUserInfo(res.accessToken);
                toast.success('Logged in successfully', { id: toastId });
                if (res.needPasswordChange) {
                    router.push('/dashboard/change-password');
                } else if (res.role === 'PATIENT') {
                    router.push('/');
                } else {
                    router.push(`/dashboard/${getRoleLowerCase(res.role)}`);
                }
            } else {
                toast.error('Something went wrong', { id: toastId });
            }
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
                        Login Apollo Health Care
                    </Typography>
                    <HFrom
                        onSubmit={handleLogin}
                        resolver={zodResolver(loginSchema)}
                        defaultValues={defaultLogin}
                        fncRef={formRef}
                    >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput label="Email" name="email" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                />
                            </Grid>

                            <Grid size={12}>
                                <Button type="submit" fullWidth>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </HFrom>
                    {/* Demo Account */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ fontSize: 12 }}
                                onClick={() =>
                                    formRef.current?.setFieldValues(
                                        superAdminLogin,
                                    )
                                }
                            >
                                Login as Super_Admin
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ fontSize: 12 }}
                                onClick={() =>
                                    formRef.current?.setFieldValues(adminLogin)
                                }
                            >
                                Login as Admin
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ fontSize: 12 }}
                                onClick={() =>
                                    formRef.current?.setFieldValues(doctorLogin)
                                }
                            >
                                Login as Doctor
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ fontSize: 12 }}
                                onClick={() =>
                                    formRef.current?.setFieldValues(
                                        patientLogin,
                                    )
                                }
                            >
                                Login as Patient
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography color="gray">
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </Typography>
                    <Typography color="gray">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            style={{
                                color: '#1586FD',
                                fontWeight: '600',
                            }}
                        >
                            Create an account
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default LoginPage;
