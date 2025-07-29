'use client';
import { Box, IconButton, Pagination, Stack } from '@mui/material';
import DoctorScheduleModal from './components/DoctorScheduleModal';
import {
    useDeleteDoctorScheduleMutation,
    useGetAllMyDoctorSchedulesQuery,
} from '@/redux/api/doctorSchedulesApi';
import Loader from '@/components/shared/Loader/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { TDoctorSchedule } from '@/types';
import { formatDateUTC, formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { MdDelete } from 'react-icons/md';
import { useDialogs } from '@toolpad/core/useDialogs';
import { toast } from 'sonner';

const DoctorSchedulesPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllMyDoctorSchedulesQuery({
        page,
        limit: 10,
    });
    const dialogs = useDialogs();
    const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

    const handleDelete = (doctorSchedule: TDoctorSchedule) => async () => {
        const deleteConfirmed = await dialogs.confirm(
            'Are you sure you want to delete The Doctor Schedule?',
        );
        if (deleteConfirmed) {
            const toastId = toast.loading('Deleting...');
            try {
                const res = await deleteDoctorSchedule(
                    doctorSchedule.scheduleId,
                ).unwrap();
                if (res.scheduleId) {
                    toast.success('Doctor Schedule deleted successfully', {
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
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
                <>{formatDateUTC(row.schedule.startDateTime)}</>
            ),
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
                <>{formatTimeUTC(row.schedule.startDateTime)}</>
            ),
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 1,
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
                <>{formatTimeUTC(row.schedule.endDateTime)}</>
            ),
        },
        {
            field: 'isBooked',
            headerName: 'Is Booked',
            flex: 1,
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
                <>{row.isBooked ? 'Yes' : 'No'}</>
            ),
        },
        {
            field: 'patientName',
            headerName: 'Patient Name',
            flex: 1,
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
                <>{row?.appointment?.patient?.name || 'N/A'}</>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }: { row: TDoctorSchedule }) => (
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
                <DoctorScheduleModal />
            </Stack>
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <DataGrid
                            rows={data?.doctorSchedules}
                            columns={columns}
                            getRowId={(row) => row.scheduleId}
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

export default DoctorSchedulesPage;
