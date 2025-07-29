import HDatePickerWatch from '@/components/Forms/HDatePickerWatch';
import HFrom from '@/components/Forms/HFrom';
import HMultipleSelect, {
    THMultipleSelectFncRef,
} from '@/components/Forms/HMultipleSelect';
import HModal from '@/components/shared/HModal/HModal';
import { useCreateDoctorScheduleMutation } from '@/redux/api/doctorSchedulesApi';
import { useGetAllSchedulesQuery } from '@/redux/api/schedulesApi';
import { createDoctorScheduleSchema } from '@/schemas/schedules.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { formatTimeUTC } from '@/utils/formatDateTimeUTC';

const DoctorScheduleModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const resetTimesRef = useRef<THMultipleSelectFncRef>(undefined);
    const [createDoctorSchedule] = useCreateDoctorScheduleMutation();

    const query: Record<string, unknown> = { sortOrder: 'asc' };

    if (!!selectedDate) {
        const localDayjs = selectedDate;
        query.startDateTime = localDayjs
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        query.endDateTime = localDayjs
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(999)
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }

    const { data, isLoading } = useGetAllSchedulesQuery(query, {
        skip: !selectedDate,
    });

    const timeSlots = data
        ? data.schedules.map((schedule) => ({
              value: schedule.id,
              label: `${formatTimeUTC(schedule.startDateTime)} - ${formatTimeUTC(schedule.endDateTime)}`,
          }))
        : [];

    const handleDoctorSchedule = async (data: FieldValues) => {
        const toastId = toast.loading('Creating...');
        try {
            const res = await createDoctorSchedule(data).unwrap();
            if (res.count) {
                toast.success('Doctor Schedule created successfully', {
                    id: toastId,
                });
                setIsModalOpen(false);
            } else {
                toast.error('Something went wrong', {
                    id: toastId,
                });
            }
        } catch (error: any) {
            if (error.data === 'Duplicate Error') {
                toast.error(
                    'You already booked some selected slots. Please choose other slots',
                    {
                        id: toastId,
                        duration: 8000,
                    },
                );
            } else {
                toast.error(
                    error.message || error.data || 'Something went wrong',
                    {
                        id: toastId,
                    },
                );
            }
        }
    };

    useEffect(() => {
        if (resetTimesRef.current) {
            resetTimesRef.current.resetField();
        }
    }, [selectedDate]);

    return (
        <>
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                    setSelectedDate(dayjs(new Date()));
                }}
            >
                Create Doctor Schedule
            </Button>
            <HModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create  Doctor Schedule"
                sx={{ width: 500, mx: 'auto' }}
            >
                <HFrom
                    onSubmit={handleDoctorSchedule}
                    resolver={zodResolver(createDoctorScheduleSchema)}
                >
                    <Stack spacing={2}>
                        <HDatePickerWatch
                            name="date"
                            label="Choose Date"
                            size="medium"
                            setSelectValue={setSelectedDate}
                        />
                        <HMultipleSelect
                            name="scheduleIds"
                            label="Time Slots"
                            options={timeSlots}
                            disabled={isLoading}
                            fncRef={resetTimesRef}
                            sx={{ width: 400 }}
                        />
                        <Button type="submit">Submit</Button>
                    </Stack>
                </HFrom>
            </HModal>
        </>
    );
};

export default DoctorScheduleModal;
