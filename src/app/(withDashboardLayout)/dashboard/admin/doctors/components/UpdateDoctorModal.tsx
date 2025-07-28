'use client';
import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import HSelect from '@/components/Forms/HSelect';
import HFullScreenModal from '@/components/shared/HModal/HFullScreenModal';
import { GenderSelect } from '@/constants/user.constant';
import { useUpdateDoctorMutation } from '@/redux/api/doctorsApi';
import { updateDoctorSchema } from '@/schemas/doctor.schema';
import { TDoctor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

const UpdateDoctorModal = ({ doctor }: { doctor: TDoctor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateDoctor] = useUpdateDoctorMutation();

    const defaultValues = {
        name: doctor?.name || undefined,
        email: doctor?.email || undefined,
        contactNumber: doctor?.contactNumber || undefined,
        address: doctor?.address || undefined,
        currentWorkingPlace: doctor?.currentWorkingPlace || undefined,
        gender: doctor?.gender || undefined,
        experience: doctor?.experience.toString() || undefined,
        appointmentFee: doctor?.appointmentFee.toString() || undefined,
        registrationNumber: doctor?.registrationNumber || undefined,
        qualification: doctor?.qualification || undefined,
        designation: doctor?.designation || undefined,
    };

    const handleCreateDoctor = async (data: FieldValues) => {
        const toastId = toast.loading('Updating...');
        try {
            const res = await updateDoctor({ id: doctor.id, data }).unwrap();
            if (res.id) {
                toast.success('Doctor updated successfully', {
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
                color="default"
                aria-label="delete"
                onClick={() => setIsModalOpen(true)}
            >
                <MdEdit />
            </IconButton>
            <HFullScreenModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Update Doctor Account"
            >
                <HFrom
                    onSubmit={handleCreateDoctor}
                    resolver={zodResolver(updateDoctorSchema)}
                    defaultValues={defaultValues}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={1}>
                            <HInput name="name" label="Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={2}>
                            <HInput name="email" label="Email" disabled />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={3}>
                            <HInput
                                name="contactNumber"
                                label="Contact Number"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} order={{ xs: 5, md: 4 }}>
                            <HInput name="address" label="Address" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} order={{ xs: 6, md: 5 }}>
                            <HInput
                                name="currentWorkingPlace"
                                label="Current Working Place"
                                minRows={2}
                            />
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            order={{ xs: 4, md: 6 }}
                        >
                            <HSelect
                                name="gender"
                                label="Gender"
                                options={GenderSelect}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={7}>
                            <HInput
                                name="experience"
                                label="Experience (Years)"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={8}>
                            <HInput
                                name="appointmentFee"
                                label="Appointment Fee"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={9}>
                            <HInput
                                name="registrationNumber"
                                label="Registration Number"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={10}>
                            <HInput
                                name="qualification"
                                label="Qualification"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} order={11}>
                            <HInput name="designation" label="Designation" />
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
                            Update Doctor
                        </Button>
                    </Box>
                </HFrom>
            </HFullScreenModal>
        </>
    );
};

export default UpdateDoctorModal;
