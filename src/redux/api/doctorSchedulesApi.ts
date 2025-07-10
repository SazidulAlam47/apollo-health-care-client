import { TCreateDoctorScheduleResponse } from '@/types';
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
        // getAllSchedules: build.query({
        //     query: (args: Record<string, unknown>) => ({
        //         url: '/schedules',
        //         method: 'GET',
        //         params: args,
        //     }),
        //     transformResponse: (response: TSchedule[], meta: TMeta) => {
        //         return {
        //             schedules: response,
        //             meta,
        //         };
        //     },
        //     providesTags: [tagTypes.schedules],
        // }),
        // deleteSchedule: build.mutation<TSchedule, any>({
        //     query: (id) => ({
        //         url: `/schedules/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: [tagTypes.schedules],
        // }),
    }),
});

export const { useCreateDoctorScheduleMutation } = doctorSchedulesApi;
