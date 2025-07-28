'use client';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import HInput from '@/components/Forms/HInput';
import HSelect from '@/components/Forms/HSelect';
import HFullScreenModal from '@/components/shared/HModal/HFullScreenModal';
import { GenderSelect } from '@/constants/user.constant';
import { useCreateDoctorMutation } from '@/redux/api/doctorsApi';
import { createDoctorSchema } from '@/schemas/doctor.schema';
import createFormData from '@/utils/createFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

const CreateDoctorModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createDoctor] = useCreateDoctorMutation();

    const handleCreateDoctor = async (data: FieldValues) => {
        const formData = createFormData(data);

        const toastId = toast.loading('Creating...');
        try {
            const res = await createDoctor(formData).unwrap();
            if (res.id) {
                toast.success('Doctor created successfully', {
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
            <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
            <HFullScreenModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create a Doctor Account"
            >
                <HFrom
                    onSubmit={handleCreateDoctor}
                    resolver={zodResolver(createDoctorSchema)}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={1}>
                            <HInput name="doctor.name" label="Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={2}>
                            <HInput name="doctor.email" label="Email" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={3}>
                            <HInput
                                name="doctor.contactNumber"
                                label="Contact Number"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} order={{ xs: 5, md: 4 }}>
                            <HInput
                                name="doctor.address"
                                label="Address"
                                multiline
                                minRows={2}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} order={{ xs: 6, md: 5 }}>
                            <HInput
                                name="doctor.currentWorkingPlace"
                                label="Current Working Place"
                                multiline
                                minRows={2}
                            />
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            order={{ xs: 4, md: 6 }}
                        >
                            <HSelect
                                name="doctor.gender"
                                label="Gender"
                                options={GenderSelect}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={7}>
                            <HInput
                                name="doctor.experience"
                                label="Experience (Years)"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={8}>
                            <HInput
                                name="doctor.appointmentFee"
                                label="Appointment Fee"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={9}>
                            <HInput
                                name="doctor.registrationNumber"
                                label="Registration Number"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={10}>
                            <HInput
                                name="doctor.qualification"
                                label="Qualification"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={11}>
                            <HInput
                                name="doctor.designation"
                                label="Designation"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                        <Grid size={{ xs: 12, sm: 6 }} order={12}>
                            <HImageUpload title="Profile Photo" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} order={13}>
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
                            Create Doctor
                        </Button>
                    </Box>
                </HFrom>
            </HFullScreenModal>
        </>
    );
};

export default CreateDoctorModal;
