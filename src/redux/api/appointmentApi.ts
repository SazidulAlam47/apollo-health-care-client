import { TAppointment, TAppointmentStatus, TMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment: build.mutation<TAppointment, any>({
            query: (data) => ({
                url: '/appointments',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.appointments],
        }),
        verifyVideoCall: build.query<TAppointment, any>({
            query: (id: string) => ({
                url: `/appointments/video-call/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.appointments],
        }),
        getAllMyAppointments: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/appointments/my-appointments',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TAppointment[], meta: TMeta) => {
                return {
                    appointments: response,
                    meta,
                };
            },
            providesTags: [tagTypes.appointments],
        }),
        updateAppointmentStatus: build.mutation<TAppointment, any>({
            query: (args: {
                id: string;
                data: { status: TAppointmentStatus };
            }) => ({
                url: `/appointments/status/${args.id}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: [tagTypes.appointments],
        }),
    }),
});

export const {
    useCreateAppointmentMutation,
    useGetAllMyAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
    useVerifyVideoCallQuery,
} = appointmentApi;
