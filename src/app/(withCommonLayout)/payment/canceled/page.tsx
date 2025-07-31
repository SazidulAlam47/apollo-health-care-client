import { Box, Stack, Typography } from '@mui/material';
import { FaCircleXmark } from 'react-icons/fa6';

const PaymentCanceledPage = () => {
    return (
        <Stack
            sx={{
                minHeight: '80dvh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box textAlign="center">
                <FaCircleXmark color="#ff0000" size={100} />
                <Typography variant="h4" component="h3" mt={2}>
                    Payment Canceled
                </Typography>
                <Typography mt={2}>
                    If you need any assistance, please feel free to contact us
                    at payment@apollo.com
                </Typography>
            </Box>
        </Stack>
    );
};

export default PaymentCanceledPage;
