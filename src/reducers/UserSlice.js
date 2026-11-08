
import {
  createEntityAdapter,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

// Create an adapter to manage normalized user data.
const userAdapter = createEntityAdapter();

// Create the initial state: { ids: [], entities: {} }
const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",

      // Change the API response before saving it in the cache.
      transformResponse: (responseData) => {
        // Save all users in a normalized format.
        // setAll replaces all existing users with the new data.
        return userAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

// Get the full query result from the Redux store.
// This selector does not send an API request.
export const selectAllUsersResult =
  extendedApiSlice.endpoints.getUsers.select();

// Get only the data from the query result.
// createSelector remembers the last result.
export const selectUsersData = createSelector(
  selectAllUsersResult,
  (usersResponse) => usersResponse?.data
);

// Create selectors to read users from the cache.
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = userAdapter.getSelectors(
  // Read users from the RTK Query cache.
  // Use an empty state if the data is not ready yet.
  (state) => selectUsersData(state) ?? initialState
);

// This slice is not needed if we only use RTK Query cache.
// Keep it only if you need a separate users state.
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// Export the hook to send the API request.
export const { useGetUsersQuery } = extendedApiSlice;

export default usersSlice.reducer;
