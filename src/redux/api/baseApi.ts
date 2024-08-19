import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery : fetchBaseQuery({baseUrl : 'https://nursery-nest-server.vercel.app/api'}),
    tagTypes: ["product", 'singleProduct', 'order'],
    endpoints : () => ({})
})
