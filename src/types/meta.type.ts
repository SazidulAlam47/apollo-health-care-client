export interface IAppointmentCountByMonth {
    month: string;
    count: number;
}

export interface IAppointmentStatusDistribution {
    status: string;
    count: number;
}

export interface IAdminMeta {
    doctorCount: number;
    patientCount: number;
    appointmentCount: number;
    paymentCount: number;
    totalRevenue: number;
    appointmentCountByMonth: IAppointmentCountByMonth[];
    appointmentStatusDistribution: IAppointmentStatusDistribution[];
}

export interface ISuperAdminMeta extends IAdminMeta {
    adminCount: number;
}

export interface IDoctorMeta {
    appointmentCount: number;
    patientCount: number;
    reviewCount: number;
    totalRevenue: number;
    appointmentStatusDistribution: IAppointmentStatusDistribution[];
}

export interface IPatientMeta {
    appointmentCount: number;
    prescriptionCount: number;
    reviewCount: number;
    appointmentStatusDistribution: IAppointmentStatusDistribution[];
}
