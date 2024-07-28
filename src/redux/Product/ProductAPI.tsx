import { baseApi } from "../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        const key = Object.keys(priority);
        const value = Object.values(priority);
        if (priority) {
          for (let index = 0; index < key.length; index++) {
            params.append(key[index], value[index] as string);
          }
        }
        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
    }),
    productCount: builder.query({
      query: () => {
        return {
          url: "/product/productCount",
          method: "GET"
        };
      },
    }),
    singleProduct: builder.query({
      query: (priority) => {
        return {
          url: `/product/${priority}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllProductQuery, useProductCountQuery, useSingleProductQuery } = academicSemesterApi;
