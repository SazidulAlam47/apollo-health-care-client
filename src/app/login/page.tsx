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
import { toast } from 'sonner';
import userLogin from '@/services/actions/userLogin';
import storeUserInfo from '@/services/actions/storeUserInfo';
// import { useRouter } from 'next/navigation';

export type TLoginInputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    // const router = useRouter();
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<TLoginInputs>();

    const onSubmit: SubmitHandler<TLoginInputs> = async (data) => {
        const toastId = toast.loading('Logging in...');
        try {
            const res = await userLogin(data);
            if (res.success) {
                storeUserInfo(res.data.accessToken);
                toast.success('Logged in successfully', { id: toastId });
                // router.push('/login');
            } else {
                toast.error(res.message, { id: toastId });
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
                        Login Apollo Health Care
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Email"
                                    {...register('email')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    {...register('password')}
                                />
                            </Grid>

                            <Grid size={12}>
                                <Button type="submit" fullWidth>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography color="gray">
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </Typography>
                    <Typography color="gray">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="text-[#1586FD] font-semibold"
                        >
                            Create an account
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;
