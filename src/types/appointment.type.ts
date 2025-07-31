import { TSchedule } from './schedules.type';
import { TDoctor, TPatient } from './user.type';

type TAppointmentStatus =
    | 'SCHEDULED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELED';

type TPaymentStatus = 'PAID' | 'UNPAID';

export type TAppointment = {
    id: string;
    patientId: string;
    doctorId: string;
    scheduleId: string;
    videoCallingId: string;
    status: TAppointmentStatus;
    paymentStatus: TPaymentStatus;
    reminderSent: boolean;
    patient?: TPatient;
    doctor?: TDoctor;
    schedule?: TSchedule;
};

export type TPayment = {
    id: string;
    appointmentId: string;
    transactionId: string;
    amount: number;
    status: TPaymentStatus;
    paymentGatewayData: any;
    appointment?: TAppointment;
};

export type TPaymentIntentResponse = {
    paymentUlr: string;
};
