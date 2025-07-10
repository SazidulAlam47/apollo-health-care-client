import { z } from 'zod';
import {
    convertDateToString,
    convertTimeToString,
} from '@/utils/convertDateTimeString';
import { convertDateTimeToUTC } from '@/utils/convertDateTimeUtcLocal';

export const dateObjectSchema = z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date(),
);

const now = new Date();
const today = convertDateTimeToUTC(
    new Date(`${convertDateToString(now)}T00:00:00.000Z`),
);

export const createScheduleSchema = z
    .object({
        startDate: dateObjectSchema.refine((value) => today <= value, {
            message: "Start date can't be in the past.",
        }),
        endDate: dateObjectSchema.refine((value) => today <= value, {
            message: "End date can't be in the past.",
        }),
        startTime: dateObjectSchema,
        endTime: dateObjectSchema,
    })
    .refine(
        (values) => {
            const startDateTime = new Date(
                `${convertDateToString(values.startDate)}T${convertTimeToString(values.startTime)}:00`,
            );

            return now <= startDateTime;
        },
        {
            message: "Start Time can't be in the past",
            path: ['startTime'],
        },
    )
    .refine(
        (values) => {
            const endDateTime = new Date(
                `${convertDateToString(values.endDate)}T${convertTimeToString(values.endTime)}:00`,
            );

            return now <= endDateTime;
        },
        {
            message: "End Time can't be in the past",
            path: ['endTime'],
        },
    )
    .refine((values) => values.startDate <= values.endDate, {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
    })
    .refine(
        (values) => {
            const startDateTime = new Date(
                `${convertDateToString(values.startDate)}T${convertTimeToString(values.startTime)}:00`,
            );
            const endDateTime = new Date(
                `${convertDateToString(values.endDate)}T${convertTimeToString(values.endTime)}:00`,
            );

            return startDateTime < endDateTime;
        },
        {
            message: 'End Time must be before Start Time',
            path: ['endTime'],
        },
    )
    .transform((values) => ({
        startDate: convertDateToString(values.startDate),
        endDate: convertDateToString(values.endDate),
        startTime: convertTimeToString(values.startTime),
        endTime: convertTimeToString(values.endTime),
    }));

export const createDoctorScheduleSchema = z.object({
    scheduleIds: z.array(z.string(), {
        required_error: 'Please Select Time Slots',
    }),
});
