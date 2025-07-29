'use client';
import { Box, IconButton, Pagination, Stack } from '@mui/material';
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
import { useState } from 'react';
import { formatDateUTC, formatTimeUTC } from '@/utils/formatDateTimeUTC';

const SchedulesPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllSchedulesQuery({
        page,
        limit: 10,
    });
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
            field: 'date',
            headerName: 'Date',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{formatDateUTC(row.startDateTime)}</>
            ),
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{formatTimeUTC(row.startDateTime)}</>
            ),
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 1,
            renderCell: ({ row }: { row: TSchedule }) => (
                <>{formatTimeUTC(row.endDateTime)}</>
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
            </Stack>
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <DataGrid
                            rows={data?.schedules}
                            columns={columns}
                            hideFooterPagination
                            sx={{
                                border: 0,
                            }}
                            slots={{
                                footer: () => (
                                    <Box sx={{ mt: 1 }}>
                                        <Pagination
                                            color="primary"
                                            count={data?.meta.totalPage}
                                            page={data?.meta.page}
                                            onChange={(event, page) =>
                                                setPage(page)
                                            }
                                            sx={{
                                                width: 'fit-content',
                                                ml: 'auto',
                                            }}
                                        />
                                    </Box>
                                ),
                            }}
                        />
                    </>
                )}
            </Box>
        </Stack>
    );
};

export default SchedulesPage;
