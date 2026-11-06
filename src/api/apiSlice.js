import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // مسیر قرار گیری کش های ما هس :‌state.api
  reducerPath: "api", //اگه مقدار ندیم خودش این مقدار بصورت پیش فرض میذاره
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  tagTypes: ["BLOG"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["BLOG"], //Used by query endpoints.
    }),
    getBlog: builder.query({
      query: (initialBlogId) => `/blogs/${initialBlogId}`,
    }),
    addNewBlog: builder.mutation({
      query: (initialBlog) => ({
        url: "/blogs",
        method: "POST",
        body: initialBlog,
      }),
      invalidatesTags: ["BLOG"], //Used by mutation endpoints.
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation } =
  apiSlice;
