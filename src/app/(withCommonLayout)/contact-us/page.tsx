import DashedLine from '@/components/Styled/DashedLine';
import { Box, Container, Typography } from '@mui/material';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
    return (
        <Container>
            <DashedLine />
            <Box textAlign="center">
                <Typography
                    variant="h4"
                    component="h4"
                    fontSize={{ xs: '25px', md: '45px' }}
                    fontWeight={600}
                >
                    Get in touch with us
                </Typography>
                <Typography color="gray" maxWidth={500} margin="auto">
                    We&apos;re here to help. Send your query or question below
                    and provide us with as much detail as possible. We will
                    answer your query as soon as possible. We aim to reply to
                    your query within 24 hours.
                </Typography>
            </Box>
            <Box maxWidth={600} mx="auto" mt={3}>
                <ContactForm />
            </Box>
        </Container>
    );
};

export default ContactPage;
