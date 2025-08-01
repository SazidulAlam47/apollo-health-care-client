'use client';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import HInput from '@/components/Forms/HInput';
import HFullScreenModal from '@/components/shared/HModal/HFullScreenModal';
import { useCreateAdminMutation } from '@/redux/api/adminsApi';
import { createAdminSchema } from '@/schemas/admin.schema';
import createFormData from '@/utils/createFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

const CreateAdminModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createAdmin] = useCreateAdminMutation();

    const handleCreateAdmin = async (data: FieldValues) => {
        const formData = createFormData(data);

        const toastId = toast.loading('Creating...');
        try {
            const res = await createAdmin(formData).unwrap();
            if (res.id) {
                toast.success('Admin created successfully', {
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
            <Button onClick={() => setIsModalOpen(true)}>Create Admin</Button>
            <HFullScreenModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create an Admin Account"
            >
                <HFrom
                    onSubmit={handleCreateAdmin}
                    resolver={zodResolver(createAdminSchema)}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <HInput name="admin.name" label="Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <HInput name="admin.email" label="Email" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <HInput
                                name="admin.contactNumber"
                                label="Contact Number"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <HImageUpload title="Profile Photo" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <HInput
                                name="password"
                                label="Password"
                                type="password"
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
                            Create Admin
                        </Button>
                    </Box>
                </HFrom>
            </HFullScreenModal>
        </>
    );
};

export default CreateAdminModal;
