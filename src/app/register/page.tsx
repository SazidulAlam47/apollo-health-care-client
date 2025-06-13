'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import registerPatient from '@/services/actions/registerPatient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import userLogin from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.service';
import HInput from '@/components/Forms/HInput';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth.schema';

const RegisterPage = () => {
    const router = useRouter();

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        const patientData = {
            password: data.password,
            patient: data.patient,
        };

        formData.append('data', JSON.stringify(patientData));

        if (data?.image.length) {
            const file = data?.image[0];
            formData.append('file', file);
        }

        // console.log(Object.fromEntries(formData));

        const toastId = toast.loading('Creating...');
        try {
            const regRes = await registerPatient(formData);
            if (regRes.success) {
                toast.success('Account created successfully', { id: toastId });

                const loginRes = await userLogin({
                    email: data.patient.email,
                    password: data.password,
                });

                if (loginRes.success) {
                    storeUserInfo(loginRes.data.accessToken);
                    router.push('/');
                } else {
                    toast.error(loginRes.message);
                }
            } else {
                toast.error(regRes.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };

    return (
        <Container>
            <Stack
                minHeight="100dvh"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    boxShadow={1}
                    padding={4}
                    my={2}
                    borderRadius={2}
                    className="space-y-4"
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
                            className="mx-auto"
                        />
                    </Box>
                    <Typography variant="h5" component="h5" fontWeight={600}>
                        Patient Register
                    </Typography>
                    <HFrom
                        onSubmit={onSubmit}
                        resolver={zodResolver(registerSchema)}
                    >
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <HInput label="Name" name="patient.name" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput label="Email" name="patient.email" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput
                                    label="Contract Number"
                                    name="patient.contactNumber"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HInput
                                    label="Address"
                                    name="patient.address"
                                />
                            </Grid>
                            <Grid size={12}>
                                <HImageUpload />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </HFrom>
                    <Typography color="gray">
                        Do you already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-[#1586FD] font-semibold"
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
