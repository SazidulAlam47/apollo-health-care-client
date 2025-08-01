'use client';

import Loader from '@/components/shared/Loader/Loader';
import { useGetAllMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import { useCreatePaymentIntentMutation } from '@/redux/api/paymentApi';
import { TAppointment } from '@/types';
import { formatDateUTC, formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { Box, Button, Chip, IconButton, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { toast } from 'sonner';
import { IoVideocam } from 'react-icons/io5';
import Link from 'next/link';
import capitalize from '@/utils/capitalize';
import AppointmentChip from '@/components/Styled/HChip';

const PatientAppointmentsPage = () => {
    const [page, setPage] = useState(1);

    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const handlePayNow = (appointmentId: string) => async () => {
        const toastId = toast.loading('Please wait...');

        try {
            const paymentRes = await createPaymentIntent({
                appointmentId,
            }).unwrap();

            if (paymentRes.paymentUlr) {
                window.location.href = paymentRes.paymentUlr;
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

    const { data, isLoading } = useGetAllMyAppointmentsQuery({
        page,
        limit: 10,
    });

    const columns: GridColDef[] = [
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>{row?.doctor?.name || ''}</>
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
            renderCell: ({ row }: { row: TAppointment }) => (
                <Chip
                    label={capitalize(row.paymentStatus)}
                    sx={
                        row.paymentStatus === 'PAID'
                            ? { bgcolor: '#d2f9e5', color: '#0a472d' }
                            : { bgcolor: '#ffebeb', color: '#a50000' }
                    }
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Appointment Status',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <AppointmentChip label={row.status} />
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>
                    {row.paymentStatus === 'PAID' &&
                    (row.status === 'SCHEDULED' ||
                        row.status === 'IN_PROGRESS') ? (
                        <IconButton
                            component={Link}
                            href={`/video?videoCallingId=${row.videoCallingId}`}
                        >
                            <IoVideocam />
                        </IconButton>
                    ) : null}

                    {row.paymentStatus === 'UNPAID' &&
                    row.status === 'SCHEDULED' ? (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                padding: '3px 8px',
                            }}
                            onClick={handlePayNow(row.id)}
                        >
                            Pay Now
                        </Button>
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

export default PatientAppointmentsPage;
