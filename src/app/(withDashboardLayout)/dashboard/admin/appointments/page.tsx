'use client';

import Loader from '@/components/shared/Loader/Loader';
import { useGetAllAppointmentsQuery } from '@/redux/api/appointmentApi';
import { TAppointment } from '@/types';
import capitalize from '@/utils/capitalize';
import { formatDateUTC, formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { Box, Chip, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import AppointmentChip from '@/components/Styled/HChip';

const AppointmentsPage = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useGetAllAppointmentsQuery({
        page,
        limit: 10,
    });

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
            field: 'patientContact',
            headerName: 'Patient Contact',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>{row?.patient?.contactNumber || ''}</>
            ),
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>{row?.doctor?.name || ''}</>
            ),
        },
        {
            field: 'doctorContact',
            headerName: 'Doctor Contact',
            flex: 1,
            renderCell: ({ row }: { row: TAppointment }) => (
                <>{row?.doctor?.contactNumber || ''}</>
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

export default AppointmentsPage;
