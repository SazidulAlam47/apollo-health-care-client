'use client';
import { Stack } from '@mui/material';
import DoctorScheduleModal from './components/DoctorScheduleModal';

const DoctorSchedulesPage = () => (
    <Stack direction="column" gap={3}>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <DoctorScheduleModal />
        </Stack>
        {/* <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <DataGrid
                            rows={data?.doctors}
                            columns={columns}
                            hideFooter
                            sx={{
                                border: 0,
                            }}
                        />
                        <Box sx={{ mt: 1 }}>
                            <Pagination
                                color="primary"
                                count={data?.meta.totalPage}
                                page={data?.meta.page}
                                onChange={(event, page) => setPage(page)}
                                sx={{
                                    width: 'fit-content',
                                    ml: 'auto',
                                }}
                            />
                        </Box>
                    </>
                )}
            </Box> */}
    </Stack>
);

export default DoctorSchedulesPage;
