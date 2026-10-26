import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice";

export const store = configureStore(({
    reducer : {
        blogs : blogsReducer
    }
}))