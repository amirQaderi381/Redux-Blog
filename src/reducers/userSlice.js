import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllUsers } from "../services";

/*
createAsyncThunk برای مدیریت عملیات غیرهم‌زمان استفاده می‌شه.
آرگومان اول اون، نام پایه اکشن‌هاست.
آرگومان دوم، تابع payload creator است که منطق عملیات رو اجرا می‌کنه.
این تابع با توجه به نتیجه عملیات، باعث تولید اکشن pending، fulfilled یا rejected می‌شه.
با extraReducers مشخص می‌کنی که state چطور به این اکشن‌ها واکنش نشون بده.
با return نتیجه موفق رو به action.payload می‌فرستی و با rejectWithValue می‌تونی مقدار مشخصی برای خطا برگردونی.
اگر در کامپوننت به رفتار معمول Promise و انتقال خطا به catch نیاز داری، از .unwrap() استفاده کن
*/

//createAsyncThunk عملیات غیرهم‌زمان رو مدیریت می‌کنه؛ extraReducers در createSlice مشخص می‌کنه که state چطور به اکشن‌های حاصل از اون عملیات واکنش نشون بده.

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled , (state , action) => {
        return action.payload;
        /* with returning new result Immer will replace existing state with whatever we return */
    })
  },
});


export const selectAllUsers = state => state.users;
export const selectUserById = (state , userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;
