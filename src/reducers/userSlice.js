import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUsers } from "../services";

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

export const addUser = createAsyncThunk(
  "/users/createUser",
  async (initialUser) => {
    const response = await createUser(initialUser);
    return response.data;
  },
);

export const removeUser = createAsyncThunk("/users/deleteUser" , async (userId) => {
  await deleteUser(userId);
  return userId;
});

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
     addCase(fetchUsers.fulfilled, userAdapter.setAll)
    // addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload;
    //   /* with returning new result Immer will replace existing state with whatever we return */
    // })
    .addCase(addUser.fulfilled , userAdapter.addOne)
    .addCase(removeUser.fulfilled , userAdapter.removeOne)
    ;
  },
});

export const {
  selectAll : selectAllUsers,
  selectById : selectUserById
} = userAdapter.getSelectors(state => state.users);

// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
