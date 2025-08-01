'use client';
import { Box, IconButton, Pagination, Stack, TextField } from '@mui/material';
import CreateAdminModal from './components/CreateAdminModal';
import {
    useDeleteAdminMutation,
    useGetAllAdminsQuery,
} from '@/redux/api/adminsApi';
import Loader from '@/components/shared/Loader/Loader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { TAdmin } from '@/types';
import getProfilePhotoOrAvatar from '@/utils/getProfilePhotoOrAvatar';
import { MdDelete } from 'react-icons/md';
import { useDialogs } from '@toolpad/core/useDialogs';
import { toast } from 'sonner';
import { useState } from 'react';
import useDebounced from '@/hooks/useDebounced';
import UpdateAdminModal from './components/UpdateAdminModal';

const AdminsPage = () => {
    const query: Record<string, unknown> = {};
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    if (!!debouncedValue) {
        query.searchTerm = searchTerm;
    }
    query.page = page;

    const { data, isLoading } = useGetAllAdminsQuery(query);
    const [deleteAdmin] = useDeleteAdminMutation();
    const dialogs = useDialogs();

    const handleDelete = (admin: TAdmin) => async () => {
        const deleteConfirmed = await dialogs.confirm(
            `Are you sure you want to delete "${admin.name}"?`,
        );
        if (deleteConfirmed) {
            const toastId = toast.loading('Deleting...');
            try {
                const res = await deleteAdmin(admin.id).unwrap();
                if (res.id) {
                    toast.success('Admin deleted successfully', {
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
            renderCell: ({ row }: { row: TAdmin }) => (
                <Box height="100%" padding="5px 0" textAlign="center">
                    <Image
                        src={getProfilePhotoOrAvatar(
                            row.profilePhoto,
                            'MALE', // Default gender for admin avatars
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
            renderCell: ({ row }: { row: TAdmin }) => (
                <Box>
                    <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={handleDelete(row)}
                    >
                        <MdDelete />
                    </IconButton>
                    <UpdateAdminModal admin={row} />
                </Box>
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
                <CreateAdminModal />
                <TextField
                    size="small"
                    placeholder="Search Admins"
                    sx={{ maxWidth: '300px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Stack>
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <DataGrid
                            rows={data?.admins}
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

export default AdminsPage;
