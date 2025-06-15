import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo-white.png';
import headerMenuLinks from '../Header/headerMenuLinks';
import footerSocialLinks from './footerSocialLinks';

const Footer = () => {
    return (
        <Box component="footer" bgcolor="#111a22" color="lightgray" py={5}>
            <Container>
                <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={4}
                    justifyContent="center"
                    alignItems="center"
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
                <Stack
                    direction="row"
                    gap={3}
                    justifyContent="center"
                    py={2}
                    mt={{ xs: 1, md: 0 }}
                >
                    {footerSocialLinks.map((social, index) => (
                        <Link key={index} href={social.link} target="_blank">
                            <Image
                                src={social.logo}
                                alt={social.title}
                                width={30}
                                height={30}
                            />
                        </Link>
                    ))}
                </Stack>
                <Box
                    sx={{
                        borderBottom: '1px dashed #ddd',
                        marginBottom: { xs: 1, md: 0 },
                    }}
                />
                <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                >
                    <Typography textAlign={{ xs: 'center', md: 'start' }}>
                        &copy;{new Date().getFullYear()} Apollo Health Care. All
                        Rights Reserved.
                    </Typography>
                    <Image
                        src={logo}
                        alt="Apollo Health Care"
                        style={{
                            width: '100%',
                            maxWidth: '280px',
                        }}
                    />
                    <Stack direction="row" gap={1} fontSize={14}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Box borderLeft="1px solid #fff" />
                        <Link href="/terms">Terms & Conditions</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
