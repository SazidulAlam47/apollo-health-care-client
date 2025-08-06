import { Gender, BloodGroup, MaritalStatus } from '@/constants/user.constant';
import { z } from 'zod';
import { dateObjectSchema } from './schedules.schema';

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

export const patientHealthDataSchema = z
    .object({
        dateOfBirth: dateObjectSchema,
        gender: z.nativeEnum(Gender, {
            errorMap: () => ({ message: 'Please select your Gender' }),
        }),
        bloodGroup: z.nativeEnum(BloodGroup, {
            errorMap: () => ({ message: 'Please select your Blood Group' }),
        }),
        hasAllergies: z.boolean().default(false),
        hasDiabetes: z.boolean().default(false),
        height: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        weight: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        smokingStatus: z.boolean().default(false),
        dietaryPreferences: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        pregnancyStatus: z.boolean().default(false),
        mentalHealthHistory: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        immunizationStatus: z
            .string()
            .optional()
            .transform((val) => (val === '' ? undefined : val)),
        hasPastSurgeries: z.boolean().default(false),
        recentAnxiety: z.boolean().default(false),
        recentDepression: z.boolean().default(false),
        maritalStatus: z.nativeEnum(MaritalStatus, {
            errorMap: () => ({ message: 'Please select your Marital Status' }),
        }),
    })
    .optional();

export const medicalReportSchema = z.object({
    medicalReport: z.object({
        reportName: z
            .string({ required_error: 'Please Enter Report name' })
            .min(1, { message: 'Please Enter Report name' }),
        reportLink: z
            .string({ required_error: 'Please Enter Report Link' })
            .min(1, 'Please Enter Report Link')
            .url({ message: 'Report link must be a valid URL' }),
    }),
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
    patientHealthData: patientHealthDataSchema,
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
