import Footer from '@/components/shared/Footer/Footer';
import Header from '@/components/shared/Header/Header';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Box component="main" minHeight="100dvh">
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default CommonLayout;
