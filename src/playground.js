const store = configureStore({
    reducer: {},
});

const exampleThunkFunction = (dispatch, getState) => {
    const stateBefore = getState();
    console.log(`Counter before: ${stateBefore.counter}`);

    dispatch(increment());

    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.counter}`);
};

store.dispatch(exampleThunkFunction);

//Dispatch Plain Action
dispatch(increment());

//Thunk Action Creator
const logAndAdd = (amount) => {
    return async (dispatch, getState) => {
        const stateBefore = getState();
        console.log(`Counter before: ${stateBefore.counter}`);

        dispatch(incrementByAmount(amount));

        const stateAfter = getState();
        console.log(`Counter after: ${stateAfter.counter}`);
    };
};

//CreateAsyncThunk
export const fetchBlogs = createAsynThunk("blogs/fetchBlogs", async () => {
    const response = await client.get("url");
    return response.data;
});
//returns start/success/failure action

dispatch(fetchBlogs()); //returns 'blogs/fetchBlogs/pending' action
//if promise is resolved return 'blogs/fetchBlogs/fulfilled' action
//if promise is rejected return 'blogs/fetchBlogs/rejected' action

//extraReducer

//builder.addCase => یک ریدوسر تعریف میکنه که هندل میکنه تنها یک نوع اکشن شناخته شده
//builder.addMatcher => یک ریدوسر تعریف میکنه که به هر اکشنی جواب میده در صورتی که متچر true باشه
//builder.addDefault => یک ریدوسر تعریف میکنه که زمانی اجرا میشه که هیچ ریدوسری در جواب به اکشن نباشه

//**************************************** */
//normalized state
/*
{
    users : {
        ids : ["user1" , "user2" , "user3"],
        entities : {
            "user1" : {id : "user1" , firstName : "amir"},
            "user2" : {id : "user2" , firstName : "mohammad"},
            "user3" : {id : "user3" , firstName : "ali"}
        }
    }
}

const userId = "user2";
const userObject = state.users.entities[userId];

createEntityAdaptor({options})
{ids: [] , entities : {}}
*/

/*
متدهای اصلی:
متد	کاربرد
addOne	اضافه کردن یک بلاگ
addMany	اضافه کردن چند بلاگ
setOne	جایگزینی یک بلاگ
setMany	جایگزینی چند بلاگ
setAll	جایگزینی تمام بلاگ‌ها
updateOne	ویرایش بخشی از یک بلاگ
updateMany	ویرایش چند بلاگ
upsertOne	اضافه کردن یا به‌روزرسانی یک بلاگ
upsertMany	اضافه کردن یا به‌روزرسانی چند بلاگ
removeOne	حذف یک بلاگ
removeMany	حذف چند بلاگ
removeAll	حذف تمام بلاگ‌ها
*/
//******************************************************** */
//RTK Query :
/*
 نه تنها به سرور درخواست مبفرسته و خیلی از منطق هایی که نوشتی خودش انجام میده بلکه کش هم میکنه
 ما تا الان عملیات کش بصورت دستی انجام میدادیم  :
 مثلا اگر میخواستیم یک پست پاک کنیم نه تنها از سرور پاک میکردیم بلکه پیدا میکردیم از آرایه پست های درون حافظه رو هم پاک میکردیم
 این درون حافظه همون کش ما هست
 سینک نگه داشتن داده ها در کش و  سرور
*/