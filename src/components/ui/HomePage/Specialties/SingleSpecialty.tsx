import { TSpecialty } from '@/types';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const SingleSpecialty = ({ specialty }: { specialty: TSpecialty }) => {
    return (
        <Grid
            component={Link}
            href={`/doctors?specialties=${specialty.title}`}
            size={{ xs: 12, sm: 4, md: 2 }}
            sx={{
                background: '#f5f5f5',
                border: '1px solid #f5f5f5',
                borderRadius: '10px',
                transition: '0.5s',
                padding: { xs: '20px', md: '30px' },
                ':hover': {
                    border: '1px solid #0e82fd',
                },
            }}
        >
            <Stack spacing={1} alignItems="center">
                <Box
                    sx={{
                        height: '80px',
                        width: '80px',
                    }}
                    margin="auto"
                >
                    <Image
                        src={specialty.icon}
                        alt={specialty.title}
                        width={80}
                        height={80}
                        style={{
                            width: '80px',
                            height: '80px',
                        }}
                    />
                </Box>
                <Typography textAlign="center" fontWeight={600}>
                    {specialty.title}
                </Typography>
            </Stack>
        </Grid>
    );
};

export default SingleSpecialty;
