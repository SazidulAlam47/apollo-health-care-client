export type TAppointment = {
    id: string;
    patientId: string;
    doctorId: string;
    scheduleId: string;
    videoCallingId: string;
    status: string;
    paymentStatus: string;
    reminderSent: boolean;
};
