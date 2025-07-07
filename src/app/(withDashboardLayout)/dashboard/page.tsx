'use client';
import Loader from '@/components/shared/Loader/Loader';
import { getUserInfo } from '@/services/auth.service';
import getRoleLowerCase from '@/utils/getRoleLowerCase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
    const router = useRouter();

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            router.push(`/dashboard/${getRoleLowerCase(userInfo.role)}`);
        } else {
            router.push('/login');
        }
    }, [router]);

    return <Loader />;
};

export default DashboardPage;
