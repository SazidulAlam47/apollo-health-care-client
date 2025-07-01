'use client';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import CreateSpecialistModal from './components/CreateSpecialistModal';
import {
    useDeleteSpecialtiesMutation,
    useGetAllSpecialtiesQuery,
} from '@/redux/api/specialtiesApi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loader from '@/components/shared/Loader/Loader';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { TSpecialty } from '@/types';
import { useDialogs } from '@toolpad/core/useDialogs';
import { toast } from 'sonner';

const SpecialtiesPage = () => {
    const { data: specialties, isLoading } = useGetAllSpecialtiesQuery({});
    const [deleteSpecialties] = useDeleteSpecialtiesMutation();
    const dialogs = useDialogs();

    const handleDelete = (specialty: TSpecialty) => async () => {
        const deleteConfirmed = await dialogs.confirm(
            `Are you sure you want to delete "${specialty.title}"?`,
        );
        if (deleteConfirmed) {
            const toastId = toast.loading('Deleting...');
            try {
                const res = await deleteSpecialties(specialty.id).unwrap();
                if (res.id) {
                    toast.success('Specialist deleted successfully', {
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
            field: 'icon',
            headerName: 'Icon',
            width: 150,
            headerAlign: 'center',
            renderCell: ({ row }: { row: TSpecialty }) => (
                <Box height="100%" padding="5px 0">
                    <Image
                        src={row.icon}
                        alt={row.title}
                        width={30}
                        height={30}
                    />
                </Box>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }: { row: TSpecialty }) => (
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
                <CreateSpecialistModal />
                <TextField
                    size="small"
                    placeholder="Search Specialties"
                    sx={{ maxWidth: '300px' }}
                />
            </Stack>
            <Box>
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
            </Box>
        </Stack>
    );
};

export default SpecialtiesPage;
