import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali";

const initialState = {
  blogs: [
    {
      id: nanoid(),
      date: sub(new Date(), { days: 2, minutes: 10 }).toISOString(),
      title: "اولین پست",
      content: "محتوای اولین پست ما",
      user: "1",
      reactions: {
        thumpup: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      id: nanoid(),
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      title: "دومین پست",
      content: "محتوای دومین پست ما",
      user: "3",
      reactions: {
        thumpup: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
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
    addedReaction : (state , action) => {
      const {blogId , reaction} = action.payload;
      const existingBlog = state.blogs.find(blog => blog.id === blogId);
      existingBlog && existingBlog.reactions[reaction] ++;
    }
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id === blogId);

export const { addedBlog, updatedBlog, deletedBlog ,addedReaction } = blogSlice.actions;
export default blogSlice.reducer;
