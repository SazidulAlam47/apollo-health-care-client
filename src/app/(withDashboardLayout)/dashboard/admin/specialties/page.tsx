'use client';
import { Box, Stack, TextField } from '@mui/material';
import SpecialistModal from './components/SpecialistModal';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

const SpecialtiesPage = () => {
    const { data, isLoading } = useGetAllSpecialtiesQuery({});
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <SpecialistModal />
                <TextField
                    size="small"
                    placeholder="Search Specialties"
                    sx={{ maxWidth: '300px' }}
                />
            </Stack>
            <Box></Box>
        </Box>
    );
};

export default SpecialtiesPage;
