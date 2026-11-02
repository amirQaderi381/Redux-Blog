import {
  createAsyncThunk,
  createSlice,
  current,
  nanoid,
} from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../services";

const initialState = {
  blogs: [],
  fetchStatus: "idle",
  addStatus: "idle",
  error: null,
};

export const fetchAllBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const destroyBlog = createAsyncThunk(
  "/blogs/deleteBlog",
  async (blogId) => {
    await deleteBlog(blogId);
    return blogId;
  },
);

export const addNewBlog = createAsyncThunk(
  "/blogs/addNewBlog",
  async (newBlog) => {
    const response = await createBlog(newBlog);
    return response.data;
  },
);

export const editBlog = createAsyncThunk("/blogs/updateBlog", async (blog) => {
  const response = await updateBlog(blog.id, blog);
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
      //debugging
      console.log(state); // ❌ logs the Proxy-wrapped data
      console.log(current(state)); // ✅ CORRECT: logs a plain JS copy of the current data
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
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.fetchStatus = "completed";
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBlog.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.addStatus = "completed";
        state.blogs.push(action.payload);
      })
      .addCase(destroyBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(editBlog.fulfilled , (state , action) => {
        const {id} = action.payload;
        const blogIndex = state.blogs.findIndex(blog => blog.id === id);
        state.blogs[blogIndex] = action.payload;
      });
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id === blogId);

export const { addedBlog, updatedBlog, deletedBlog, addedReaction } =
  blogSlice.actions;
export default blogSlice.reducer;
