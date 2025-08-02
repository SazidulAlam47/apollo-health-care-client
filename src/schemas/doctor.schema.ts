import { Gender } from '@/constants/user.constant';
import { z } from 'zod';

export const createDoctorSchema = z.object({
    password: z
        .string({ required_error: 'Please enter a Password' })
        .min(1, 'Please enter a Password'),
    doctor: z.object({
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
        address: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        registrationNumber: z
            .string({
                required_error: "Please enter doctor's Registration Number",
            })
            .min(1, "Please enter doctor's Registration Number"),
        experience: z
            .string()
            .transform((val) => (val === '' ? 0 : Number(val)))
            .refine((val) => !isNaN(val), {
                message: 'Experience must be a valid number',
            }),
        gender: z.nativeEnum(Gender, {
            errorMap: () => ({ message: "Please select doctor's Gender" }),
        }),
        appointmentFee: z
            .string({ required_error: "Please Enter doctor's Appointment Fee" })
            .min(1, "Please Enter doctor's Appointment Fee")
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val), {
                message: 'Appointment Fee must be a valid number',
            }),
        qualification: z
            .string({ required_error: "Please enter doctor's Qualification" })
            .min(1, "Please enter doctor's Qualification"),
        currentWorkingPlace: z
            .string({
                required_error: "Please enter doctor's Current Working Place",
            })
            .min(1, "Please enter doctor's Current Working Place"),
        designation: z
            .string({ required_error: "Please enter doctor's Designation" })
            .min(1, "Please enter doctor's Designation"),
    }),
    image: z.any(),
});

export const updateDoctorSchema = z.object({
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
    address: z.string().transform((val) => (val === '' ? undefined : val)),
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
});
