import { z } from 'zod';

const newPasswordSchema = z
    .string({ required_error: 'Please enter your New Password' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .refine((password) => /[a-zA-Z]/.test(password), {
        message: 'Password must contain at least one letter',
    })
    .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[0-9]/.test(password), {
        message: 'Password must contain at least one number',
    })
    .refine(
        (password) => /[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/.test(password),
        {
            message: 'Password must contain at least one special character',
        },
    );

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please enter your Email' })
        .email({ message: 'Invalid Email' }),
    password: z.string().min(1, { message: 'Please enter your Password' }),
});

export const registerSchema = z.object({
    password: newPasswordSchema,
    patient: z.object({
        name: z.string().min(1, { message: 'Please enter your Name' }),
        email: z
            .string()
            .min(1, { message: 'Please enter your Email' })
            .email({ message: 'Invalid Email' }),
        contactNumber: z
            .string()
            .min(1, { message: 'Please enter your Contact Number' }),
        address: z.string().min(1, { message: 'Please enter your Address' }),
    }),
    image: z.any(),
});
