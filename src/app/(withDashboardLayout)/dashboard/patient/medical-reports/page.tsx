'use client';
import { Box, Stack, Link } from '@mui/material';
import CreateMedicalReportModal from './components/CreateMedicalReportModal';
import { useGetUserInfoQuery } from '@/redux/api/userApi';
import Loader from '@/components/shared/Loader/Loader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IMedicalReport } from '@/types';
import { MdOpenInNew } from 'react-icons/md';

const MedicalReportsPage = () => {
    const { data: user, isLoading } = useGetUserInfoQuery({});

    // Prepare medical reports data for DataGrid
    const medicalReports: IMedicalReport[] =
        (user?.medicalReport as IMedicalReport[]) || [];

    const columns: GridColDef[] = [
        {
            field: 'reportName',
            headerName: 'Report Name',
            flex: 2,
        },
        {
            field: 'reportLink',
            headerName: 'Report Link',
            flex: 2,
            renderCell: ({ row }: { row: IMedicalReport & { id: number } }) => (
                <Link
                    href={row.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: 'primary.main',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    View Report
                    <MdOpenInNew size={16} />
                </Link>
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
                <CreateMedicalReportModal />
            </Stack>
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <DataGrid
                        rows={medicalReports}
                        columns={columns}
                        hideFooterPagination
                        sx={{
                            border: 0,
                        }}
                        disableRowSelectionOnClick
                    />
                )}
            </Box>
        </Stack>
    );
};

export default MedicalReportsPage;
