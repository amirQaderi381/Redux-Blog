import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const blogSlice = createSlice({
  name: "blogs",
  initialState : [],
  reducers: {}
});

export const selectAllBlogsResult = apiSlice.endpoints.getBlogs.select();
export const selectAllBlogs = createSelector(
  selectAllBlogsResult,
  (blogsResult) => blogsResult?.data ?? []
)

export const selectUserBlogs = createSelector(
  [selectAllBlogs, (state, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user === userId),
);

export const { addedBlog, updatedBlog, deletedBlog, addedReaction } =
  blogSlice.actions;
export default blogSlice.reducer;
