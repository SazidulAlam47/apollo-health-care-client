'use client';
import { useState } from 'react';
import { Button } from '@mui/material';
import HFullScreenModal from '@/components/shared/HModal/HFullScreenModal';
import HFrom from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import { Grid } from '@mui/material';
import { useUpdateProfileMutation } from '@/redux/api/userApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';
import { medicalReportSchema } from '@/schemas/user.schema';
import createFormData from '@/utils/createFormData';

const CreateMedicalReportModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateProfile] = useUpdateProfileMutation();

    const handleCreateMedicalReport = async (data: FieldValues) => {
        const formData = createFormData(data);
        const toastId = toast.loading('Creating Medical Report...');
        try {
            const res = await updateProfile(formData).unwrap();
            if (res.id) {
                toast.success('Medical Report created successfully', {
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
            <Button onClick={() => setIsModalOpen(true)}>
                Add Medical Report
            </Button>
            <HFullScreenModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Add Medical Report"
            >
                <HFrom
                    onSubmit={handleCreateMedicalReport}
                    resolver={zodResolver(medicalReportSchema)}
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <HInput
                                name="medicalReport.reportName"
                                label="Report Name"
                            />
                        </Grid>
                        <Grid size={12}>
                            <HInput
                                name="medicalReport.reportLink"
                                label="Report Link"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        sx={{
                            mt: 2,
                        }}
                    >
                        Add Report
                    </Button>
                </HFrom>
            </HFullScreenModal>
        </>
    );
};

export default CreateMedicalReportModal;
