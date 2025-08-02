import { z } from 'zod';

export const createSpecialistSchema = z.object({
    title: z
        .string({ required_error: 'Please enter Specialist Name' })
        .min(1, 'Please enter Specialist Name'),
    image: z.custom((val: FileList) => val.length >= 1, {
        message: 'Please upload Specialist icon',
    }),
});
