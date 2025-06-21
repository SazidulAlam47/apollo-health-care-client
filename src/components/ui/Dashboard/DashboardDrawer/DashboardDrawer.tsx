'use client';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ReactNode, useMemo } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import { Session } from '@toolpad/core/AppProvider';
import { toast } from 'sonner';
import { removeUser } from '@/services/auth.service';
import { getDashboardMenus } from '@/utils/dashboardMenus.util';

const DashboardDrawer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const nextSearchParams = useSearchParams();

    // const [session, setSession] = useState<Session | null>({
    //     user: {
    //         name: 'Bharat',
    //         email: 'bharatkashyap@outlook.com',
    //         image: 'https://avatars.githubusercontent.com/u/19550456',
    //     },
    // });

    const session: Session = {
        user: {
            name: 'Bharat ',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    };

    const searchParams = new URLSearchParams(nextSearchParams.toString());

    const navigate = (url: string | URL) => {
        router.push(typeof url === 'string' ? url : url.toString());
    };

    const authentication = useMemo(() => {
        return {
            signIn: () => {},
            signOut: () => {
                router.push('/');
                toast.success('Logged out successfully');
                removeUser();
            },
        };
    }, [router]);

    return (
        <NextAppProvider
            navigation={getDashboardMenus('SUPER_ADMIN')}
            router={{ pathname, searchParams, navigate }}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout
                branding={{
                    logo: (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Image
                                src={logo}
                                alt="Apollo Health Care"
                                width={50}
                                height={50}
                                style={{
                                    height: '30px',
                                    width: '30px',
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="h1"
                                fontWeight={500}
                                fontSize={{ xs: '0.9rem', sm: '1.2rem' }}
                            >
                                Apollo Health Care
                            </Typography>
                        </Stack>
                    ),
                    title: '',
                    homeUrl: '/',
                }}
            >
                <Box sx={{ p: 3 }}>{children}</Box>
            </DashboardLayout>
        </NextAppProvider>
    );
};

export default DashboardDrawer;
