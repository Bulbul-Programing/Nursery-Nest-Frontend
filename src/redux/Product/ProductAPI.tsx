import { baseApi } from "../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          const key = Object.keys(priority);
          const value = Object.values(priority);
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
      providesTags:['product']
    }),
    createProduct: builder.mutation({
      query: (productData) => {
        return {
          url: "/product",
          method: "POST",
          body: productData,
        };
      },
      invalidatesTags : ['product']
    }),
    updateProduct: builder.mutation({
      query: (productData) => {
        return {
          url: `/product/${productData.id}`,
          method: "PATCH",
          body: productData.data,
        };
      },
      invalidatesTags : ['product', 'singleProduct']
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        return {
          url: `/product/${productId}`,
          method: 'DELETE'
        }
      },
      invalidatesTags : ['product']
    }),
    productCount: builder.query({
      query: () => {
        return {
          url: "/product/productCount",
          method: "GET",
        };
      },
      providesTags:['product']
    }),
    singleProduct: builder.query({
      query: (priority) => {
        return {
          url: `/product/${priority}`,
          method: "GET",
        };
      },
      providesTags: ['singleProduct']
    }),
    getMultipleProduct: builder.query({
      query: (priority) => {
        return {
          url: "/product/getMultipleProduct",
          method: "POST",
          body: priority,
        };
      },
    }),
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: "/order/create-order",
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags : ['product', 'singleProduct', 'order']
    }),
    getAllOrder: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          const key = Object.keys(priority);
          const value = Object.values(priority);
          for (let index = 0; index < key.length; index++) {
            params.append(key[index], value[index] as string);
          }
        }
        return {
          url: "/order",
          method: "GET",
          params: params
        };
      },
      providesTags : ['order']
    }),
    lastSevenDaysOrder: builder.query({
      query: () => {
        return {
          url: "/order/last-seven-days",
          method: "GET",
        };
      },
      providesTags : ['order']
    }),
    lastSevenDaysVisitors: builder.query({
      query: () => {
        return {
          url: "/visitor/last-seven-days",
          method: "GET",
        };
      },
      providesTags : ['order']
    }),
    totalVisitor: builder.query({
      query: () => {
        return {
          url: "/visitor",
          method: "GET",
        };
      },
    }),
    updateOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: `/order/${orderData.id}`,
          method: "PATCH",
          body: orderData.data,
        };
      },
      invalidatesTags : ['product', 'order']
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useProductCountQuery,
  useSingleProductQuery,
  useGetMultipleProductQuery,
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useDeleteProductMutation,
  useUpdateOrderMutation,
  useLastSevenDaysOrderQuery,
  useTotalVisitorQuery,
  useLastSevenDaysVisitorsQuery
} = academicSemesterApi;
