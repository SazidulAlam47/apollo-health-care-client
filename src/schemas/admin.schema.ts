import { z } from 'zod';

export const createAdminSchema = z.object({
    password: z
        .string({ required_error: 'Please enter a Password' })
        .min(1, 'Please enter a Password'),
    admin: z.object({
        name: z
            .string({ required_error: 'Please enter your Name' })
            .min(1, 'Please enter your Name'),
        email: z
            .string({ required_error: 'Please enter your Email' })
            .min(1, 'Please enter your Email')
            .email('Invalid Email'),
        contactNumber: z
            .string({ required_error: 'Please enter your Contact Number' })
            .min(1, 'Please enter your Contact Number')
            .regex(/^01\d{9}$/, {
                message: 'Number must be 11 digits and start with 01',
            }),
    }),
    image: z.any(),
});

export const updateAdminSchema = z.object({
    name: z.string().transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
        .string()
        .transform((val) => (val === '' ? undefined : val))
        .refine((val) => val === undefined || /^01\d{9}$/.test(val), {
            message: 'Number must be 11 digits and start with 01',
        }),
    image: z.any(),
});
