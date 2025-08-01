'use client';

import Loader from '@/components/shared/Loader/Loader';
import {
    useGetAllMyAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
} from '@/redux/api/appointmentApi';

import { TAppointment } from '@/types';
import { formatDateUTC, formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { Box, IconButton, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IoVideocam } from 'react-icons/io5';
import { toast } from 'sonner';

const DoctorAppointmentPage = () => {
    const [page, setPage] = useState(1);
    const router = useRouter();

    const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

    const { data, isLoading } = useGetAllMyAppointmentsQuery({
        page,
        limit: 10,
    });

    const handleJoin = (appointment: TAppointment) => async () => {
        const payload = {
            id: appointment.id,
            data: {
                status: 'IN_PROGRESS',
            },
        };

        const toastId = toast.loading('Joining...');
        try {
            const res = await updateAppointmentStatus(payload).unwrap();
            if (res.id) {
                toast.success('Video call starting...', {
                    id: toastId,
                });
                router.push(
                    `/video?videoCallingId=${appointment.videoCallingId}`,
                );
            } else {
                toast.error('Something went wrong', {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'patientName',
            headerName: 'Patient Name',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>{row?.patient?.name || ''}</>
            ),
        },
        {
            field: 'appointmentDate',
            headerName: 'Appointment Date',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>
                    {row?.schedule?.startDateTime
                        ? formatDateUTC(row?.schedule?.startDateTime)
                        : ''}
                </>
            ),
        },
        {
            field: 'appointmentTime',
            headerName: 'Appointment Time',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>
                    {row?.schedule?.startDateTime
                        ? formatTimeUTC(row?.schedule?.startDateTime)
                        : ''}
                </>
            ),
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Appointment Status',
            flex: 1,
        },

        {
            field: 'join',
            headerName: 'Join',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>
                    {row.paymentStatus === 'PAID' &&
                    (row.status === 'SCHEDULED' ||
                        row.status === 'IN_PROGRESS') ? (
                        <IconButton onClick={handleJoin(row)}>
                            <IoVideocam />
                        </IconButton>
                    ) : null}
                </>
            ),
        },
    ];

    return (
        <Box>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <DataGrid
                        rows={data?.appointments}
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
    );
};

export default DoctorAppointmentPage;
