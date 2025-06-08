export type TSpecialty = {
    id: string;
    title: string;
    icon: string;
};

export type TDoctorSpecialty = {
    specialitiesId: string;
    doctorId: string;
    specialties: TSpecialty;
};
