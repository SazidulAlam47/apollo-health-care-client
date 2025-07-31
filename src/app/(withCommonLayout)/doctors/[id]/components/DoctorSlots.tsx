'use client';

import { useCreateAppointmentMutation } from '@/redux/api/appointmentApi';
import { useGetAllDoctorSchedulesQuery } from '@/redux/api/doctorSchedulesApi';
import { useCreatePaymentIntentMutation } from '@/redux/api/paymentApi';
import { getUserInfo } from '@/services/auth.service';
import { formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const DoctorSlots = ({ doctorId }: { doctorId: string }) => {
    const user = getUserInfo();
    const router = useRouter();

    const [createAppointment] = useCreateAppointmentMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const [selectedScheduleId, setSelectedScheduleId] = useState('');
    const now = new Date();
    const query: Record<string, unknown> = { doctorId, isBooked: 'false' };
    query.startDateTime = dayjs(now)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    query.endDateTime = dayjs(now)
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const { data, isLoading } = useGetAllDoctorSchedulesQuery(query);

    const today = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = dayjs(now).format('DD-MM-YYYY');

    const handleBookAppointment = async () => {
        if (!user) {
            toast.error('Please Login to Book Appointment');
            router.push('/login');
        } else if (user.role !== 'PATIENT') {
            toast.error('Only Patient can Book Appointment');
        } else if (!selectedScheduleId) {
            toast.error('Please Select a Schedule');
        } else {
            const appointmentPayload = {
                doctorId,
                scheduleId: selectedScheduleId,
            };

            const toastId = toast.loading('Please wait...');
            try {
                const appointmentRes =
                    await createAppointment(appointmentPayload).unwrap();
                if (appointmentRes.id) {
                    const paymentPayload = {
                        appointmentId: appointmentRes.id,
                    };

                    const paymentRes =
                        await createPaymentIntent(paymentPayload).unwrap();

                    if (paymentRes.paymentUlr) {
                        window.location.href = paymentRes.paymentUlr;
                    } else {
                        toast.error('Something went wrong', {
                            id: toastId,
                        });
                    }
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

    return (
        <Stack direction="column" spacing={1} mt={3}>
            <Typography component="h5" variant="h4" color="primary">
                Availability
            </Typography>
            <Typography color="gray" fontSize={18}>
                <Typography
                    component="span"
                    color="#474747ff"
                    fontSize={18}
                    fontWeight={600}
                >
                    Today:
                </Typography>{' '}
                {date}
                {', '}
                {today}
            </Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : data?.doctorSchedules.length ? (
                    data?.doctorSchedules.map((doctorSchedule) => (
                        <Button
                            key={doctorSchedule.scheduleId}
                            variant="outlined"
                            size="small"
                            sx={
                                selectedScheduleId === doctorSchedule.scheduleId
                                    ? {
                                          backgroundColor: '#1377e2f3',
                                          color: '#fff',
                                      }
                                    : {}
                            }
                            onClick={() =>
                                setSelectedScheduleId(doctorSchedule.scheduleId)
                            }
                        >
                            {formatTimeUTC(
                                doctorSchedule.schedule.startDateTime,
                            )}{' '}
                            -{' '}
                            {formatTimeUTC(doctorSchedule.schedule.endDateTime)}
                        </Button>
                    ))
                ) : (
                    <Typography>No Schedules is Available Today.</Typography>
                )}
            </Stack>
            <Button
                sx={{
                    mt: 2,
                    width: 'fit-content',
                }}
                onClick={handleBookAppointment}
            >
                Book Appointment
            </Button>
        </Stack>
    );
};

export default DoctorSlots;
