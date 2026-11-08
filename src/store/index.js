import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice";
import usersReducer from "../reducers/userSlice";
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
// store.dispatch(fetchUsers());

//we are using RTK Query : core (not hooks : second way)
console.log(apiSlice.endpoints.getUsers)
store.dispatch(apiSlice.endpoints.getUsers.initiate());