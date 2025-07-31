'use client';

import { useGetAllDoctorSchedulesQuery } from '@/redux/api/doctorSchedulesApi';
import { formatTimeUTC } from '@/utils/formatDateTimeUTC';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

const DoctorSlots = ({ doctorId }: { doctorId: string }) => {
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

    const handleBookAppointment = () => {
        console.log({ doctorId, selectedScheduleId });
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
