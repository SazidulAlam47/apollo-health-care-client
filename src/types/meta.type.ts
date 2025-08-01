export interface AppointmentCountByMonth {
    month: string;
    count: number;
}

export interface AppointmentStatusDistribution {
    status: string;
    count: number;
}

export interface TAdminMeta {
    doctorCount: number;
    patientCount: number;
    appointmentCount: number;
    paymentCount: number;
    totalRevenue: number;
    appointmentCountByMonth: AppointmentCountByMonth[];
    appointmentStatusDistribution: AppointmentStatusDistribution[];
}

export interface TSuperAdminMeta extends TAdminMeta {
    adminCount: number;
}
