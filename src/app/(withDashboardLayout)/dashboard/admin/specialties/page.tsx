'use client';
import { Box, IconButton, Pagination, Stack, TextField } from '@mui/material';
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
import { useState } from 'react';
import useDebounced from '@/hooks/useDebounced';

const SpecialtiesPage = () => {
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

    const { data, isLoading } = useGetAllSpecialtiesQuery(query);
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Stack>
            <Box>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <DataGrid
                            rows={data?.specialties}
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

export default SpecialtiesPage;
