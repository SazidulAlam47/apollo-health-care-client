import { Gender, UserRole } from '@/constants/user.constant';

export type TUserRole = keyof typeof UserRole;

export interface TDoctor {
    name: string;
    email: string;
    contactNumber: string;
    address: string | null;
    registrationNumber: string;
    experience: number;
    gender: keyof typeof Gender;
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
}
