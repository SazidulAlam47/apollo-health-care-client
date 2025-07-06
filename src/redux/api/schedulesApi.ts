import { TMeta, TSchedule } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const schedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSchedule: build.mutation<TSchedule[], any>({
            query: (data) => ({
                url: '/schedules',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.schedules],
        }),
        getAllSchedules: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/schedules',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TSchedule[], meta: TMeta) => {
                return {
                    doctors: response,
                    meta,
                };
            },
            providesTags: [tagTypes.schedules],
        }),
        deleteSchedule: build.mutation<TSchedule, any>({
            query: (id) => ({
                url: `/schedules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.schedules],
        }),
    }),
});

export const {
    useCreateScheduleMutation,
    useGetAllSchedulesQuery,
    useDeleteScheduleMutation,
} = schedulesApi;
