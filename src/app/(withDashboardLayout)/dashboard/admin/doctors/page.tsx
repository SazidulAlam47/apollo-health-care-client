import { Stack, TextField } from '@mui/material';
import CreateDoctorModal from './components/CreateDoctorModal';

const DoctorsPage = () => (
    <Stack direction="column" gap={3}>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <CreateDoctorModal />
            <TextField
                size="small"
                placeholder="Search Specialties"
                sx={{ maxWidth: '300px' }}
            />
        </Stack>
        {/* <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <DataGrid
                        rows={specialties}
                        columns={columns}
                        hideFooter
                        sx={{
                            border: 0,
                        }}
                    />
                )}
            </Box> */}
    </Stack>
);

export default DoctorsPage;
