import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      id: nanoid(),
      date: new Date().toISOString(),
      title: "اولین پست",
      content: "محتوای اولین پست ما",
    },
    {
      id: nanoid(),
      date: new Date().toISOString(),
      title: "دومین پست",
      content: "محتوای دومین پست ما",
    },
  ],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addedBlog: {
      reducer: (state, action) => {
        state.blogs.push(action.payload);
      },
      prepare: (title, content) => {
        //تابع prepare بهت اجازه می‌ده قبل از رسیدن اطلاعات به reducer، ساختار payload رو آماده و سفارشی کنی.
        //prepare object paylod (complex action) before sending to reducer
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
  },
});

export const selectAllBlogs = state => state.blogs.blogs;
export const selectBlogById = (state , blogId) => state.blogs.blogs.find(blog => blog.id === blogId);

export const { addedBlog, updatedBlog } = blogSlice.actions;
export default blogSlice.reducer;
