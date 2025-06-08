import { TSpecialty } from '@/types/specialties.type';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const Specialties = async () => {
    const res = await fetch(
        'http://localhost:5000/api/v1/specialties?limit=6',
        {
            next: {
                revalidate: 30,
            },
        },
    );

    const { data: specialties } = await res.json();

    return (
        <Container sx={{ my: 8 }} className="space-y-8">
            <Box textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h4" component="h4" fontWeight={600}>
                    Explore Treatments across specialties
                </Typography>
                <Typography color="gray">
                    Find experienced doctors across all specialties
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {specialties.map((specialty: TSpecialty) => (
                    <Grid
                        key={specialty.id}
                        size={{ xs: 12, sm: 4, md: 2 }}
                        className="space-y-3"
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
                        <Box className="size-20" margin="auto">
                            <Image
                                src={specialty.icon}
                                alt={specialty.title}
                                width={100}
                                height={100}
                                className="size-20"
                            />
                        </Box>
                        <Typography textAlign="center" fontWeight={600}>
                            {specialty.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Box textAlign="center">
                <Button variant="outlined">View All</Button>
            </Box>
        </Container>
    );
};

export default Specialties;
