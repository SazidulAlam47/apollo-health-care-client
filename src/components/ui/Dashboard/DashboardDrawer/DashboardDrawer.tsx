'use client';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ReactNode, useMemo } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { navigation } from './dashboardNavigation';
import Image from 'next/image';
import logo from '@/assets/logo/logo-icon.png';
import { Session } from '@toolpad/core/AppProvider';
import { toast } from 'sonner';
import { removeUser } from '@/services/auth.service';

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
            navigation={navigation}
            router={{ pathname, searchParams, navigate }}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout
                branding={{
                    logo: (
                        <Image
                            src={logo}
                            alt="Apollo Health Care"
                            width={80}
                            height={80}
                        />
                    ),
                    title: 'Apollo Health Care',
                    homeUrl: '/',
                }}
            >
                <Box sx={{ p: 3 }}>{children}</Box>
            </DashboardLayout>
        </NextAppProvider>
    );
};

export default DashboardDrawer;
