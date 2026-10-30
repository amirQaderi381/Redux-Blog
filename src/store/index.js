import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice";
import usersReducer, { fetchUsers } from "../reducers/userSlice";

export const store = configureStore(({
    reducer : {
        blogs : blogsReducer,
        users : usersReducer
    }
}))

//fetch all users from api
store.dispatch(fetchUsers());