import axiosBaseQuery from '@/helpers/axios/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tagTypes';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});
