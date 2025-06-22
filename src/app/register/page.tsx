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
import getRoleLowerCase from '@/utils/getRoleLowerCase';

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
                    router.push(
                        `/dashboard/${getRoleLowerCase(loginRes.data.role)}`,
                    );
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
                                    inputMode="numeric"
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
                            style={{
                                color: '#1586FD',
                                fontWeight: '600',
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
