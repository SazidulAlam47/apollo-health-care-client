'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import { getIsLoggedIn, removeUser } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const HeaderButton = () => {
    const isLoggedIn = getIsLoggedIn();
    const router = useRouter();

    const handleLogout = () => {
        toast.success('Logged out successfully');
        removeUser();
        router.refresh();
    };
    return (
        <>
            {isLoggedIn ? (
                <Button color="error" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default HeaderButton;
