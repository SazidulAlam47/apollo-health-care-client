import { Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-black.png';
import dynamic from 'next/dynamic';
import HeaderMobileDrawer from './HeaderMobileDrawer';
import headerMenuLinks from '@/constants/headerMenuLinks';

const Header = () => {
    const HeaderButton = dynamic(() => import('./HeaderButton'), {
        ssr: false,
    });

    return (
        <Container component="header">
            <Stack
                py={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
            >
                <HeaderMobileDrawer />
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        style={{
                            width: '100%',
                            maxWidth: '280px',
                        }}
                    />
                </Link>
                <Stack
                    direction="row"
                    gap={4}
                    justifyContent="space-between"
                    display={{ xs: 'none', md: 'flex' }}
                >
                    {headerMenuLinks.map((menu, index) => (
                        <Typography
                            key={index}
                            component={Link}
                            href={menu.route}
                        >
                            {menu.title}
                        </Typography>
                    ))}
                </Stack>
                <HeaderButton />
            </Stack>
        </Container>
    );
};

export default Header;
