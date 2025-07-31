import { TCreateDoctorScheduleResponse, TDoctorSchedule, TMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const doctorSchedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: build.mutation<
            TCreateDoctorScheduleResponse,
            any
        >({
            query: (data) => ({
                url: '/doctor-schedules',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.doctorSchedules],
        }),
        getAllDoctorSchedules: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/doctor-schedules',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TDoctorSchedule[], meta: TMeta) => {
                return {
                    doctorSchedules: response,
                    meta,
                };
            },
            providesTags: [tagTypes.doctorSchedules],
        }),
        getAllMyDoctorSchedules: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/doctor-schedules/my-schedule',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TDoctorSchedule[], meta: TMeta) => {
                return {
                    doctorSchedules: response,
                    meta,
                };
            },
            providesTags: [tagTypes.doctorSchedules],
        }),
        deleteDoctorSchedule: build.mutation<TDoctorSchedule, any>({
            query: (id) => ({
                url: `/doctor-schedules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.doctorSchedules],
        }),
    }),
});

export const {
    useCreateDoctorScheduleMutation,
    useGetAllMyDoctorSchedulesQuery,
    useGetAllDoctorSchedulesQuery,
    useDeleteDoctorScheduleMutation,
} = doctorSchedulesApi;
