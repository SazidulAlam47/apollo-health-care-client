'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count - 1);
            if (count <= 1) {
                router.push('/dashboard/patient/appointments');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [router, count]);

    return (
        <Stack
            sx={{
                minHeight: '80dvh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box textAlign="center">
                <FaCircleCheck color="#23b93c" size={100} />
                <Typography variant="h4" component="h3" mt={2}>
                    Payment Success
                </Typography>
                <Typography mt={2}>
                    You will be redirected in {count} seconds...
                </Typography>
            </Box>
        </Stack>
    );
};

export default PaymentSuccessPage;
