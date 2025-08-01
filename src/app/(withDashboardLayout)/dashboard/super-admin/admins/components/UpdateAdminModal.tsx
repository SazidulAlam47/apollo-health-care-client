'use client';
import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import HFullScreenModal from '@/components/shared/HModal/HFullScreenModal';
import { useUpdateAdminMutation } from '@/redux/api/adminsApi';
import { updateAdminSchema } from '@/schemas/admin.schema';
import { TAdmin } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

const UpdateAdminModal = ({ admin }: { admin: TAdmin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateAdmin] = useUpdateAdminMutation();

    const defaultValues = {
        name: admin?.name || undefined,
        email: admin?.email || undefined,
        contactNumber: admin?.contactNumber || undefined,
    };

    const handleUpdateAdmin = async (data: FieldValues) => {
        const toastId = toast.loading('Updating...');
        try {
            const res = await updateAdmin({ id: admin.id, data }).unwrap();
            if (res.id) {
                toast.success('Admin updated successfully', {
                    id: toastId,
                });
                setIsModalOpen(false);
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

    return (
        <>
            <IconButton
                color="primary"
                aria-label="edit"
                onClick={() => setIsModalOpen(true)}
            >
                <MdEdit />
            </IconButton>
            <HFullScreenModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Update Admin Information"
            >
                <HFrom
                    onSubmit={handleUpdateAdmin}
                    resolver={zodResolver(updateAdminSchema)}
                    defaultValues={defaultValues}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <HInput name="name" label="Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <HInput name="email" label="Email" disabled />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <HInput
                                name="contactNumber"
                                label="Contact Number"
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2} textAlign="right">
                        <Button
                            type="submit"
                            sx={{
                                padding: '7px 20px',
                                width: 'fit-content',
                            }}
                        >
                            Update Admin
                        </Button>
                    </Box>
                </HFrom>
            </HFullScreenModal>
        </>
    );
};

export default UpdateAdminModal;
