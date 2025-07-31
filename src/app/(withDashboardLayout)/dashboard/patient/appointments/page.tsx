'use client';

import { useGetAllMyAppointmentsQuery } from '@/redux/api/appointmentApi';

const PatientAppointmentsPage = () => {
    const { data } = useGetAllMyAppointmentsQuery({});

    console.log(data);

    return (
        <div>
            <p>This is Appointments Page (Patient)</p>
        </div>
    );
};

export default PatientAppointmentsPage;
