'use client';
import { useEffect } from 'react';
import DashboardDrawer from '@/components/ui/Dashboard/DashboardDrawer/DashboardDrawer';
import { getIsLoggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        if (!getIsLoggedIn()) {
            router.push('/login');
        }
    }, [router]);

    return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
