import { Gender, UserRole } from '@/constants/user.constant';
import { TDoctorSpecialty } from './specialties.type';

export type TUserRole = keyof typeof UserRole;

export type TGender = keyof typeof Gender;

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
