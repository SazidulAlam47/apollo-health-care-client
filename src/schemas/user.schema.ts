/* eslint-disable quotes */
import { Gender } from '@/constants/user.constant';
import { z } from 'zod';

export const createDoctorSchema = z.object({
    password: z.string().min(1, 'Please enter a Password'),
    doctor: z.object({
        name: z.string().min(1, 'Please enter your Name'),
        email: z
            .string()
            .min(1, 'Please enter your Email')
            .email('Invalid Email'),
        contactNumber: z
            .string()
            .min(1, 'Please enter your Contact Number')
            .regex(/^01\d{9}$/, {
                message: 'Number must be 11 digits and start with 01',
            }),
        address: z.string().transform((val) => (val === '' ? undefined : val)),
        registrationNumber: z
            .string()
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
            .string()
            .min(1, "Please Enter doctor's Appointment Fee")
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val), {
                message: 'Appointment Fee must be a valid number',
            }),
        qualification: z.string().min(1, "Please enter doctor's Qualification"),
        currentWorkingPlace: z
            .string()
            .min(1, "Please enter doctor's Current Working Place"),
        designation: z.string().min(1, "Please enter doctor's Designation"),
    }),
    image: z.any(),
});
