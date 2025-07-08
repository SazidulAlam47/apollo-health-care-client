'use client';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Stack, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import { Session } from '@toolpad/core/AppProvider';
import { getUserInfo, userLogout } from '@/services/auth.service';
import { getDashboardMenus } from '@/utils/dashboardMenus.util';
import { TUserRole } from '@/types';
import theme from '@/lib/theme/theme';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { Account } from '@toolpad/core/Account';
import { toast } from 'sonner';

const DashboardDrawer = ({ children }: { children: ReactNode }) => {
    const [userRole, setUserRole] = useState<TUserRole | undefined>(undefined);
    const pathname = usePathname();
    const router = useRouter();
    const nextSearchParams = useSearchParams();
    const { data: user } = useGetSingleUserQuery({});

    const [session, setSession] = useState<Session | null>({
        user: {
            name: 'User',
        },
    });

    useEffect(() => {
        const userInfo = getUserInfo();
        if (!userInfo) {
            router.push('/');
            return;
        }
        setUserRole(userInfo.role);
    }, [router]);

    useEffect(() => {
        if (user) {
            setSession({
                user: {
                    name: user.name || 'User',
                    email: user.email,
                    image: user.profilePhoto,
                },
            });
        }
    }, [user]);

    const searchParams = new URLSearchParams(nextSearchParams.toString());

    const navigate = (url: string | URL) => {
        router.push(typeof url === 'string' ? url : url.toString());
    };

    const authentication = useMemo(() => {
        return {
            signIn: () => {},
            signOut: async () => {
                router.push('/');

                const toastId = toast.loading('Logging out...');
                try {
                    await userLogout();
                    toast.success('Logged out successfully', { id: toastId });
                } catch (error: any) {
                    toast.error(error.message || 'Something went wrong', {
                        id: toastId,
                    });
                }
            },
        };
    }, [router]);

    return (
        <NextAppProvider
            navigation={getDashboardMenus(userRole)}
            router={{ pathname, searchParams, navigate }}
            authentication={authentication}
            session={session}
        >
            <ThemeProvider theme={theme}>
                <DashboardLayout
                    branding={{
                        logo: (
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
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
                    slots={{
                        toolbarActions: () => <Account />,
                    }}
                >
                    <Box sx={{ p: 3 }}>{children}</Box>
                </DashboardLayout>
            </ThemeProvider>
        </NextAppProvider>
    );
};

export default DashboardDrawer;
