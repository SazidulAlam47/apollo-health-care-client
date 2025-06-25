import { Box, Stack, TextField } from '@mui/material';
import SpecialistModal from './components/SpecialistModal';

const SpecialtiesPage = () => {
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <SpecialistModal />
                <TextField size="small" placeholder="Search Specialties" />
            </Stack>
        </Box>
    );
};

export default SpecialtiesPage;
