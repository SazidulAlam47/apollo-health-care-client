import { Stack } from '@mui/material';
import CreateScheduleModal from './components/CreateScheduleModal';

const SchedulesPage = () => (
    <Stack direction="column" gap={3}>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <CreateScheduleModal />
            {/* <TextField
                    size="small"
                    placeholder="Search Doctors"
                    sx={{ maxWidth: '300px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
        </Stack>
        {/* <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <DataGrid
                        rows={data?.doctors}
                        columns={columns}
                        sx={{
                            border: 0,
                        }}
                    />
                )}
            </Box> */}
    </Stack>
);

export default SchedulesPage;
