import { TDoctorSpecialty } from './specialties.type';

export type TDoctor = {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: string;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    doctorSpecialties: TDoctorSpecialty[];
};
