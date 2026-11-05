import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  // مسیر قرار گیری کش های ما هس :‌state.api
  reducerPath : "api" , //اگه مقدار ندیم خودش این مقدار بصورت پیش فرض میذاره
  baseQuery : fetchBaseQuery({baseUrl : "http://localhost:9000"}),
  endpoints : builder => ({
    getBlogs: builder.query({
        query: () => "/blogs"
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetBlogsQuery} = apiSlice;