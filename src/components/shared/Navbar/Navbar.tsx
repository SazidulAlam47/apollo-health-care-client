import { Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-black.png';

const Navbar = () => {
    return (
        <Container component="header">
            <Stack
                py={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Image src={logo} alt="logo" height={60} />
                <Stack direction="row" gap={4} justifyContent="space-between">
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
                <Button component={Link} href="/login">
                    Login
                </Button>
            </Stack>
        </Container>
    );
};

export default Navbar;
