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

const RegisterPage = () => {
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
                    <form>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField label="Name" name="name" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField label="Email" name="email" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Contract Number"
                                    name="contractNumber"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField label="Address" name="address" />
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
