'use client';
import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-icon.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schemas/auth.schema';
import { FieldValues } from 'react-hook-form';
import { useForgotPasswordMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';
import { IoMdCheckmark } from 'react-icons/io';

const ForgotPasswordPage = () => {
    const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

    const handleForgot = async (data: FieldValues) => {
        const toastId = toast.loading('Sending Email...');
        try {
            await forgotPassword(data).unwrap();
            toast.success('Reset Password Email sent', { id: toastId });
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
                        Forgot Password
                    </Typography>

                    {isSuccess ? (
                        <Alert icon={<IoMdCheckmark />} severity="success">
                            Please Check your email for the reset password link
                        </Alert>
                    ) : (
                        <>
                            <HFrom
                                onSubmit={handleForgot}
                                resolver={zodResolver(forgotPasswordSchema)}
                            >
                                <Grid container spacing={3}>
                                    <Grid size={12}>
                                        <HInput label="Email" name="email" />
                                    </Grid>

                                    <Grid size={12}>
                                        <Button type="submit" fullWidth>
                                            Send Rest Email
                                        </Button>
                                    </Grid>
                                </Grid>
                            </HFrom>

                            <Typography color="gray">
                                Remember Password?{' '}
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
                        </>
                    )}
                </Stack>
            </Stack>
        </Container>
    );
};

export default ForgotPasswordPage;
