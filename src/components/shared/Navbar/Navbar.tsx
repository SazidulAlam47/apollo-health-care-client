import { Box, Container, Stack, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <Container>
            <Stack py={2} direction="row" justifyContent="space-between">
                <Typography component="h5" variant="h5" fontWeight={600}>
                    <Box component="span" color="primary.main">
                        A
                    </Box>
                    pollo Health Care
                </Typography>
            </Stack>
        </Container>
    );
};

export default Navbar;
