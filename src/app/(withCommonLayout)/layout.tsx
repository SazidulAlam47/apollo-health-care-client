import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <Box component="main" minHeight="100dvh">
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default CommonLayout;
