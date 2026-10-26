import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
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
];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addedBlog: {
      reducer: (state, action) => {
        state.push(action.payload);
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
  },
});

export const { addedBlog } = blogSlice.actions;
export default blogSlice.reducer;