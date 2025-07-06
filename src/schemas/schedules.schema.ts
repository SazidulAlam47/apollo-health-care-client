import { z } from 'zod';
import {
    convertDateToString,
    convertTimeToString,
} from '@/utils/convertDateTimeString';

export const dateObjectSchema = z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date(),
);

export const createScheduleSchema = z
    .object({
        startDate: dateObjectSchema,
        endDate: dateObjectSchema,
        startTime: dateObjectSchema,
        endTime: dateObjectSchema,
    })
    .refine((values) => values.startDate <= values.endDate, {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
    })
    .refine(
        (values) => {
            const startTime = new Date(
                `${convertDateToString(values.startDate)}T${convertTimeToString(values.startTime)}:00`,
            );
            const endTime = new Date(
                `${convertDateToString(values.endDate)}T${convertTimeToString(values.endTime)}:00`,
            );

            return startTime < endTime;
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
