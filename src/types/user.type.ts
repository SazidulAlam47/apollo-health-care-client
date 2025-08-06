import {
    Gender,
    UserRole,
    UserStatus,
    BloodGroup,
    MaritalStatus,
} from '@/constants/user.constant';
import { TDoctorSpecialty } from './specialties.type';

export type TUserRole = keyof typeof UserRole;

export type TGender = keyof typeof Gender;

export type TUserStatus = keyof typeof UserStatus;

export type TBloodGroup = keyof typeof BloodGroup;

export type TMaritalStatus = keyof typeof MaritalStatus;

export interface IPatientHealthData {
    id: string;
    dateOfBirth?: string | Date;
    gender: TGender;
    bloodGroup?: TBloodGroup;
    hasAllergies: boolean;
    hasDiabetes: boolean;
    height?: string;
    weight?: string;
    smokingStatus?: boolean;
    dietaryPreferences?: string;
    pregnancyStatus?: boolean;
    mentalHealthHistory?: string;
    immunizationStatus?: string;
    hasPastSurgeries?: boolean;
    recentAnxiety?: boolean;
    recentDepression?: boolean;
    maritalStatus?: TMaritalStatus;
}

export interface IMedicalReport {
    id: string;
    reportName: string;
    reportLink: string;
}

export interface IUser {
    name?: string | undefined;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    contactNumber?: string | undefined;
    address?: string | null | undefined;
    profilePhoto?: string | null | undefined;
    isDeleted?: boolean | undefined;
    registrationNumber?: string | undefined;
    experience?: number | undefined;
    gender?: TGender | undefined;
    appointmentFee?: number | undefined;
    qualification?: string | undefined;
    currentWorkingPlace?: string | undefined;
    designation?: string | undefined;
    averageRating?: number | undefined;
    role: TUserRole;
    needPasswordChange: boolean;
    status: TUserStatus;
    doctorSpecialties?: TDoctorSpecialty[];
    patientHealthData?: IPatientHealthData;
    medicalReport?: IMedicalReport | IMedicalReport[];
}

export interface TDoctor {
    name: string;
    email: string;
    contactNumber: string;
    address: string | null;
    registrationNumber: string;
    experience: number;
    gender: TGender;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    id: string;
    averageRating: number;
    isDeleted: boolean;
    profilePhoto: string | null;
    doctorSpecialties?: TDoctorSpecialty[];
}

export type TPatient = {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string | null;
    isDeleted: boolean;
};

export type TAdmin = {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    isDeleted: boolean;
};
