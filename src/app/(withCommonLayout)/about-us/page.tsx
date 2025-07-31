import DashedLine from '@/components/Styled/DashedLine';
import { Box, Container, Typography } from '@mui/material';

const AboutPage = () => {
    return (
        <Container>
            <DashedLine />
            <Box textAlign="center">
                <Typography
                    variant="h4"
                    component="h4"
                    fontWeight={600}
                    fontSize={{ xs: '32px', md: '44px' }}
                >
                    About Us
                </Typography>
            </Box>

            <Typography
                fontSize={{ xs: '18px', md: '20px' }}
                lineHeight={{ xs: '26px', md: '28px' }}
                mt={2}
            >
                Apollo Health Care is a digital-first healthcare platform built
                to serve the rapidly evolving needs of emerging markets. Our
                mission is to make high-quality, affordable healthcare
                accessible to everyone—regardless of location or socioeconomic
                status.
            </Typography>

            <Typography
                fontSize={{ xs: '18px', md: '20px' }}
                lineHeight={{ xs: '26px', md: '28px' }}
                mt={1}
            >
                We provide a complete suite of telehealth services, including
                instant consultations with licensed general practitioners and
                specialists, digital prescriptions, home delivery of medicines,
                and access to diagnostic and pathology testing—all from the
                comfort of your home.
            </Typography>

            <Typography
                fontSize={{ xs: '18px', md: '20px' }}
                lineHeight={{ xs: '26px', md: '28px' }}
                mt={1}
            >
                Our platform is fully integrated with certified pharmacies,
                diagnostic labs, and secure payment gateways to deliver a
                seamless, end-to-end digital health experience. By leveraging
                technology and data-driven insights, Apollo Health Care is
                setting new standards in patient care and public health support.
            </Typography>

            <Typography
                fontSize={{ xs: '18px', md: '20px' }}
                lineHeight={{ xs: '26px', md: '28px' }}
                mt={1}
            >
                At Apollo Health Care, we are committed to transforming
                healthcare through innovation, compassion, and efficiency. We
                are continuously improving our services to better support
                clinical research, patient monitoring, and health record
                management.
            </Typography>

            <Typography
                fontSize={{ xs: '18px', md: '20px' }}
                lineHeight={{ xs: '26px', md: '28px' }}
                mt={1}
            >
                With a dedicated team of healthcare professionals and
                technologists, Apollo Health Care is shaping the future of
                health—simpler, smarter, and more human.
            </Typography>
        </Container>
    );
};

export default AboutPage;
