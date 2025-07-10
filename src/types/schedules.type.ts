export type TSchedule = {
    id: string;
    createdAt: Date;
    startDateTime: Date;
    endDateTime: Date;
    updatedAt: Date;
};

export type TDoctorSchedule = {
    doctorId: string;
    scheduleId: string;
    isBooked: boolean;
    appointmentId: string | null;
    schedule: TSchedule;
};

export type TCreateDoctorScheduleResponse = {
    count: number;
};
