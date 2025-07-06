'use client';
import HDatePicker from '@/components/Forms/HDatePicker';
import HFrom from '@/components/Forms/HFrom';
import HTimePicker from '@/components/Forms/HTimePicker';
import HModal from '@/components/shared/HModal/HModal';
import { useCreateScheduleMutation } from '@/redux/api/schedulesApi';
import { createScheduleSchema } from '@/schemas/schedules.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

const CreateScheduleModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createSchedule] = useCreateScheduleMutation();

    const handleCreateSchedule = async (data: FieldValues) => {
        const toastId = toast.loading('Creating...');
        try {
            const res = await createSchedule(data).unwrap();
            if (res.length) {
                toast.success('Schedules created successfully', {
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
                Create Schedules
            </Button>
            <HModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create a Schedules"
            >
                <HFrom
                    onSubmit={handleCreateSchedule}
                    resolver={zodResolver(createScheduleSchema)}
                >
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <HDatePicker name="startDate" label="Start Date" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <HDatePicker name="endDate" label="End Date" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <HTimePicker name="startTime" label="Start Time" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <HTimePicker name="endTime" label="End Time" />
                        </Grid>
                    </Grid>
                    <Button type="submit" sx={{ mt: 1.5 }} size="small">
                        Create
                    </Button>
                </HFrom>
            </HModal>
        </>
    );
};

export default CreateScheduleModal;
