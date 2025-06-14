'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import { getIsLoggedIn } from '@/services/auth.service';
import HeaderUserMenu from './HeaderUserMenu';

const HeaderButton = () => {
    const isLoggedIn = getIsLoggedIn();

    return (
        <>
            {isLoggedIn ? (
                <HeaderUserMenu />
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default HeaderButton;
