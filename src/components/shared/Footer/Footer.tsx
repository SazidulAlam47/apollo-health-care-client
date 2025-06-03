import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import facebookLogo from '@/assets/landing_page/facebook.png';
import instagramLogo from '@/assets/landing_page/instagram.png';
import twitterLogo from '@/assets/landing_page/twitter.png';
import linkedinLogo from '@/assets/landing_page/linkedin.png';
import logo from '@/assets/logo/logo-white.png';

const Footer = () => {
    return (
        <Box component="footer" bgcolor="#111a22" color="lightgray" py={5}>
            <Container>
                <Stack direction="row" gap={4} justifyContent="center">
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
                <Stack direction="row" gap={3} justifyContent="center" py={2}>
                    <Link href="https://facebook.com" target="_blank">
                        <Image
                            src={facebookLogo}
                            alt="facebook"
                            width={30}
                            height={30}
                        />
                    </Link>
                    <Link href="https://instagram.com" target="_blank">
                        <Image
                            src={instagramLogo}
                            alt="instagram"
                            width={30}
                            height={30}
                        />
                    </Link>
                    <Link href="https://x.com" target="_blank">
                        <Image
                            src={twitterLogo}
                            alt="twitter"
                            width={30}
                            height={30}
                        />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank">
                        <Image
                            src={linkedinLogo}
                            alt="linkedin"
                            width={30}
                            height={30}
                        />
                    </Link>
                </Stack>
                <div className="border-b-[1px] border-dashed" />
                <Stack
                    direction="row"
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                >
                    <Typography component="p">
                        &copy;{new Date().getFullYear()} Apollo Health Care. All
                        Rights Reserved.
                    </Typography>
                    <Image src={logo} alt="Apollo Health Care" height={60} />
                    <Stack direction="row" gap={1}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Typography>|</Typography>
                        <Link href="/terms">Terms & Conditions</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
