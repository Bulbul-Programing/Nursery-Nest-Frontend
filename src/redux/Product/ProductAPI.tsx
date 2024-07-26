import { baseApi } from "../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (priority) => {
        const params = new URLSearchParams()
        
       const key = Object.keys(priority)
        const value = Object.values(priority)
        
        if(priority){
          for (let index = 0; index < key.length; index++) {
            params.append(key[index] , value[index] as string )
          }
        }
        
        return {
          url: "/product",
          method: "GET",
          params : params
        };
      },
    }),
    // priceFilterProduct: builder.query({
    //   query: (priority) => {
    //     const data = {
    //       minPrice : priority[0],
    //       maxPrice : priority[1]
    //     }
    //     return {
    //       url: "/product/priceFilter",
    //       method: "POST",
    //       body : data
    //     };
    //   },
    // }),
  }),
});

export const { useGetAllProductQuery } = academicSemesterApi;
