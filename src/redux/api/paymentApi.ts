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
    }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
