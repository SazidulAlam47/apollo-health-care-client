import { Box, Stack, Typography } from '@mui/material';
import { FaCircleExclamation } from 'react-icons/fa6';

const PaymentFailedPage = () => {
    return (
        <Stack
            sx={{
                minHeight: '80dvh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box textAlign="center">
                <FaCircleExclamation color="#ff0000" size={100} />
                <Typography variant="h4" component="h3" mt={2}>
                    Payment Failed
                </Typography>
                <Typography mt={2}>
                    If you need any assistance, please feel free to contact us
                    at payment@apollo.com
                </Typography>
            </Box>
        </Stack>
    );
};

export default PaymentFailedPage;
