import { TPaymentIntentResponse } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPaymentIntent: build.mutation<TPaymentIntentResponse, any>({
            query: (data) => ({
                url: '/payments/init-payment',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.payments],
        }),
        // getAllDoctors: build.query({
        //     query: (args: Record<string, unknown>) => ({
        //         url: '/doctors',
        //         method: 'GET',
        //         params: args,
        //     }),
        //     transformResponse: (response: TDoctor[], meta: TMeta) => {
        //         return {
        //             doctors: response,
        //             meta,
        //         };
        //     },
        //     providesTags: [tagTypes.doctors],
        // }),

        // updateDoctor: build.mutation<TDoctor, any>({
        //     query: (args: { id: string; data: Partial<TDoctor> }) => ({
        //         url: `/doctors/${args.id}`,
        //         method: 'PATCH',
        //         data: args.data,
        //     }),
        //     invalidatesTags: [tagTypes.doctors],
        // }),
    }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
