'use client';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import CreateDoctorModal from './components/CreateDoctorModal';
import {
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery,
} from '@/redux/api/doctorsApi';
import Loader from '@/components/shared/Loader/Loader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { TDoctor } from '@/types';
import getProfilePhotoOrAvatar from '@/utils/getProfilePhotoOrAvatar';
import { MdDelete } from 'react-icons/md';
import { useDialogs } from '@toolpad/core/useDialogs';
import { toast } from 'sonner';

const DoctorsPage = () => {
    const { data, isLoading } = useGetAllDoctorsQuery({});
    const [deleteDoctor] = useDeleteDoctorMutation();
    const dialogs = useDialogs();

    const handleDelete = (doctor: TDoctor) => async () => {
        const deleteConfirmed = await dialogs.confirm(
            `Are you sure you want to delete "${doctor.name}"?`,
        );
        if (deleteConfirmed) {
            const toastId = toast.loading('Deleting...');
            try {
                const res = await deleteDoctor(doctor.id).unwrap();
                if (res.id) {
                    toast.success('Doctor deleted successfully', {
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
            field: 'profilePhoto',
            headerName: 'Profile Photo',
            width: 100,
            headerAlign: 'center',
            renderCell: ({ row }: { row: TDoctor }) => (
                <Box height="100%" padding="5px 0" textAlign="center">
                    <Image
                        src={getProfilePhotoOrAvatar(
                            row.profilePhoto,
                            row.gender,
                        )}
                        alt={row.name}
                        width={80}
                        height={80}
                        style={{
                            width: '50px',
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'contactNumber',
            headerName: 'Contact Number',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }: { row: TDoctor }) => (
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
                <CreateDoctorModal />
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
                        rows={data?.doctors}
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

export default DoctorsPage;
