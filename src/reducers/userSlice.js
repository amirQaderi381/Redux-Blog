import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id : "1",
        fullname : "امیر قادری",
    },
    {
        id : "2",
        fullname : "ایمان صادقی",
    },
    {
        id : "3",
        fullname : "فرهاد خسروی",
    }
];

const usersSlice = createSlice({
    name : "users",
    initialState,
    reducers : {}
})

export default usersSlice.reducer;