import {  createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getUsers : builder.query({
      query : () => "/users"
    })
  })
})

// یک selector memorized شده هس که از cache داده ها رو نمایش میده
export const selectAllUsersResult = extendedApiSlice.endpoints.getUsers.select();

const emptyUsers = [];

// a ?? b => if a is true return a else b
export const selectAllUsers = createSelector(
  [selectAllUsersResult],
  (result) => result?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  [selectAllUsers , (state , userId) => userId],
  (users , userId) => users.find(user => user.id === userId)
);

const usersSlice = createSlice({
  name: "users",
  initialState : emptyUsers,
  reducers: {},
});

export const {useGetUsersQuery} = extendedApiSlice;
export default usersSlice.reducer;
