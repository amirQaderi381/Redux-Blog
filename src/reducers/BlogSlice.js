import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllBlogs } from "../services";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchAllBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // state : state.blogs -> state.blogs : state.blogs.blogs
    //first blog : global state in store and second is from initial

    addedBlog: {
      reducer: (state, action) => {
        state.blogs.push(action.payload);
      },
      prepare: (title, content, userId) => {
        //تابع prepare بهت اجازه می‌ده قبل از رسیدن اطلاعات به reducer، ساختار payload رو آماده و سفارشی کنی.
        //prepare object paylod (complex action) before sending to reducer\
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    updatedBlog: (state, action) => {
      const { id, title, content } = action.payload;
      const existingBlog = state.blogs.find((blog) => blog.id === id);
      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.content = content;
      }
    },
    deletedBlog: (state, action) => {
      const { id } = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },
    addedReaction: (state, action) => {
      const { blogId, reaction } = action.payload;
      const existingBlog = state.blogs.find((blog) => blog.id === blogId);
      existingBlog && existingBlog.reactions[reaction]++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id === blogId);

export const { addedBlog, updatedBlog, deletedBlog, addedReaction } =
  blogSlice.actions;
export default blogSlice.reducer;
