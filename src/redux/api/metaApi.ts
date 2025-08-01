import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const metaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMeta: build.query({
            query: () => ({
                url: '/meta',
                method: 'GET',
            }),
            providesTags: [tagTypes.meta],
        }),
    }),
});

export const { useGetMetaQuery } = metaApi;
