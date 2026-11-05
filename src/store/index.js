import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice";
import usersReducer, { fetchUsers } from "../reducers/userSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore(({
    reducer : {
        blogs : blogsReducer,
        users : usersReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query` to defaluts redux middlewares.
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
}))

//fetch all users from api
store.dispatch(fetchUsers());