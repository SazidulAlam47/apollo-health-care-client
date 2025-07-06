import { Gender, UserRole, UserStatus } from '@/constants/user.constant';
import { TDoctorSpecialty } from './specialties.type';

export type TUserRole = keyof typeof UserRole;

export type TGender = keyof typeof Gender;

export type TUserStatus = keyof typeof UserStatus;

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
    createdAt: Date;
    updatedAt: Date;
    averageRating: number;
    isDeleted: boolean;
    profilePhoto: string | null;
    doctorSpecialties?: TDoctorSpecialty[];
}
