import { TAppointment } from './appointment.type';

export type TSchedule = {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
};

export type TDoctorSchedule = {
    doctorId: string;
    scheduleId: string;
    isBooked: boolean;
    appointmentId: string | null;
    schedule: TSchedule;
    appointment?: TAppointment;
};

export type TCreateDoctorScheduleResponse = {
    count: number;
};
