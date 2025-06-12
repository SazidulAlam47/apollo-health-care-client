'use client';
import { Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-black.png';
import { getIsLoggedIn, removeUser } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Header = () => {
    const isLoggedIn = getIsLoggedIn();
    const router = useRouter();

    const handleLogout = () => {
        toast.success('Logged out successfully');
        removeUser();
        router.refresh();
    };

    return (
        <Container component="header">
            <Stack
                py={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        className="w-full max-w-[280px]"
                    />
                </Link>
                <Stack
                    direction="row"
                    gap={4}
                    justifyContent="space-between"
                    display={{ xs: 'none', md: 'flex' }}
                >
                    <Typography component={Link} href="/consultation">
                        Consultation
                    </Typography>
                    <Typography component={Link} href="/health-plans">
                        Health Plans
                    </Typography>
                    <Typography component={Link} href="/medicine">
                        Medicine
                    </Typography>
                    <Typography component={Link} href="/diagnostics">
                        Diagnostics
                    </Typography>
                    <Typography component={Link} href="/ngo">
                        NGOs
                    </Typography>
                </Stack>
                {isLoggedIn ? (
                    <Button color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button component={Link} href="/login">
                        Login
                    </Button>
                )}
            </Stack>
        </Container>
    );
};

export default Header;
