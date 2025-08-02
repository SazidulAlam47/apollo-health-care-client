import { Gender } from '@/constants/user.constant';
import { z } from 'zod';

export const updateAdminProfileSchema = z.object({
    name: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .refine((val) => val === undefined || /^01\d{9}$/.test(val), {
            message: 'Number must be 11 digits and start with 01',
        }),

    image: z.any(),
});

export const updatePatientProfileSchema = z.object({
    name: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .refine((val) => val === undefined || /^01\d{9}$/.test(val), {
            message: 'Number must be 11 digits and start with 01',
        }),
    address: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    image: z.any(),
});

export const updateDoctorProfileSchema = z.object({
    name: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .refine((val) => val === undefined || /^01\d{9}$/.test(val), {
            message: 'Number must be 11 digits and start with 01',
        }),
    address: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    registrationNumber: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),

    experience: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : Number(val)))
        .refine((val) => val === undefined || !isNaN(val), {
            message: 'Experience must be a valid number',
        }),
    gender: z.nativeEnum(Gender, {
        errorMap: () => ({ message: "Please select doctor's Gender" }),
    }),
    appointmentFee: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : Number(val)))
        .refine((val) => val === undefined || !isNaN(val), {
            message: 'Appointment Fee must be a valid number',
        }),
    qualification: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    currentWorkingPlace: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    designation: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
    specialties: z.array(z.string()),
    image: z.any(),
});
