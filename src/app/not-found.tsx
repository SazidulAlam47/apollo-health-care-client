import Footer from '@/components/shared/Footer/Footer';
import Header from '@/components/shared/Header/Header';
import DashedLine from '@/components/Styled/DashedLine';
import { Container, Typography } from '@mui/material';

const NotFoundPage = () => {
    return (
        <>
            <Header />
            <Container
                sx={{
                    minHeight: '50dvh',
                }}
            >
                <DashedLine />

                <Typography
                    variant="h3"
                    component="h3"
                    textAlign="center"
                    mt={2}
                >
                    404
                </Typography>
                <Typography textAlign="center" mt={2}>
                    This page could not be found.
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default NotFoundPage;
