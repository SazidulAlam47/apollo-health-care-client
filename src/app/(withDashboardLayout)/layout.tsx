'use client';
import DashboardDrawer from '@/components/ui/Dashboard/DashboardDrawer/DashboardDrawer';
import { getIsLoggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    if (!getIsLoggedIn()) {
        return router.push('/login');
    }

    return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
