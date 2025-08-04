'use client';

import Footer from '@/components/shared/Footer/Footer';
import Header from '@/components/shared/Header/Header';
import DashedLine from '@/components/Styled/DashedLine';
import { Container, Typography } from '@mui/material';

const ErrorPage = () => {
    return (
        <>
            <Header />
            <Container
                sx={{
                    minHeight: '50dvh',
                }}
            >
                <DashedLine />

                <Typography textAlign="center" fontSize={25} mt={4}>
                    Something went wrong.
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default ErrorPage;
