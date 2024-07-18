import { baseApi } from "../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (priority) => {
        // const key = Object.keys(priority)
        // const value = Object.values(priority)
        const params = new URLSearchParams()
        // console.log(key , value);
        if(priority){
          params.append('sort' , priority)
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
