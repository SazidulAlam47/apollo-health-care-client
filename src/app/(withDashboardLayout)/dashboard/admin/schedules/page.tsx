'use client';
import { Box, IconButton, Stack } from '@mui/material';
import CreateScheduleModal from './components/CreateScheduleModal';
import {
    useDeleteScheduleMutation,
    useGetAllSchedulesQuery,
} from '@/redux/api/schedulesApi';
import Loader from '@/components/shared/Loader/Loader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TSchedule } from '@/types';
import { MdDelete } from 'react-icons/md';
import { useDialogs } from '@toolpad/core/useDialogs';
import { toast } from 'sonner';
import dayjs from 'dayjs';

const SchedulesPage = () => {
    const { data, isLoading } = useGetAllSchedulesQuery({});
    const [deleteSchedule] = useDeleteScheduleMutation();
    const dialogs = useDialogs();

    const handleDelete = (schedule: TSchedule) => async () => {
        const deleteConfirmed = await dialogs.confirm(
            'Are you sure you want to delete The Schedule?',
        );
        if (deleteConfirmed) {
            const toastId = toast.loading('Deleting...');
            try {
                const res = await deleteSchedule(schedule.id).unwrap();
                if (res.id) {
                    toast.success('Schedule deleted successfully', {
                        id: toastId,
                    });
                } else {
                    toast.error('Something went wrong', {
                        id: toastId,
                    });
                }
            } catch (error: any) {
                toast.error(
                    error.message || error.data || 'Something went wrong',
                    {
                        id: toastId,
                    },
                );
            }
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{dayjs(row.startDateTime).format('DD/MM/YYYY')}</>
            ),
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{dayjs(row.endDateTime).format('DD/MM/YYYY')}</>
            ),
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{dayjs(row.startDateTime).format('hh:mm a')}</>
            ),
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{dayjs(row.endDateTime).format('hh:mm a')}</>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }: { row: TSchedule }) => (
                <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={handleDelete(row)}
                >
                    <MdDelete />
                </IconButton>
            ),
        },
    ];

    return (
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
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <DataGrid
                        rows={data?.schedules}
                        columns={columns}
                        sx={{
                            border: 0,
                        }}
                    />
                )}
            </Box>
        </Stack>
    );
};

export default SchedulesPage;
