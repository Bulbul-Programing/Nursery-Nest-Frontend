import { baseApi } from "../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (priority) => {
        const params = new URLSearchParams()
        if(priority){
          params.append(priority[0] , priority[1])
        }
        
        return {
          url: "/product",
          method: "GET",
          params : params
        };
      },
    }),
  }),
});

export const { useGetAllProductQuery } = academicSemesterApi;
