import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice";
import usersReducer from "../reducers/userSlice";

export const store = configureStore(({
    reducer : {
        blogs : blogsReducer,
        users : usersReducer
    }
}))