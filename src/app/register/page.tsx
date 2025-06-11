'use client';
import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    password: string;
    patient: {
        name: string;
        email: string;
        contractNumber: string;
        address: string;
    };
};

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
                    <Box>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField
                                    label="Name"
                                    {...register('patient.name')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Email"
                                    {...register('patient.email')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Password"
                                    {...register('password')}
                                    type="password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Contract Number"
                                    {...register('patient.contractNumber')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Address"
                                    {...register('patient.address')}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
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
