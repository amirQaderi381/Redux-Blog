import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // مسیر قرار گیری کش های ما هس :‌state.api
  reducerPath: "api", //اگه مقدار ندیم خودش این مقدار بصورت پیش فرض میذاره
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  tagTypes: ["BLOG"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      //result = [آرایه ای از بلاگ ها]
      providesTags: (result = [], error, arg) => [
        "BLOG",
        ...result.map(({ id }) => ({ type: "BLOG", id })), //به ازای هر پست برچسب خاص خودشو دادیم توسط شناسه هر بلاگ
      ],
    }),
    getBlog: builder.query({
      query: (initialBlogId) => `/blogs/${initialBlogId}`,
      providesTags: (result, error, arg) => [{ type: "BLOG", id: arg }],
    }),
    addNewBlog: builder.mutation({
      query: (initialBlog) => ({
        url: "/blogs",
        method: "POST",
        body: initialBlog,
      }),
      invalidatesTags: ["BLOG"], //Used by mutation endpoints.
    }),
    updateBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog.id}`,
        method: "PUT",
        body: blog,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "BLOG", id: arg.id }],
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddNewBlogMutation,
  useUpdateBlogMutation,
} = apiSlice;


/*
providesTags = این کش به چه برچسب‌هایی تعلق دارد؟
invalidatesTags = کدام کش‌ها بعد از تغییر اطلاعات باید مجدداً به‌روزرسانی شوند؟
از تگ ها خاص برای مدیریت کش استفاده کردیم که کش مربوط به بلاگ خودشو نامعتبر کنیم تا اینکه همه کش ها رو
مثلا برای ویرایش نباید همه کش ها رو بی اعتبار کرد اونوقت همه بلاگ ها رو فتچ میکنه که سرعت برنامه رو میاره پایین
باید کش بلاگی که تغییر کرده رو نا نعتبر کنیم
*/


// ==================== TAGS & CACHE MANAGEMENT ====================
//
// در RTK Query از Tags برای مدیریت هوشمند Cache استفاده می‌کنیم
// تا بعد از تغییر اطلاعات، فقط درخواست‌های مرتبط مجدداً Fetch شوند.
//
// providesTags:
// مشخص می‌کند نتیجه یک Query با چه برچسب‌هایی مرتبط است.
// یعنی RTK Query می‌فهمد هر Cache متعلق به کدام برچسب‌هاست.
//
// invalidatesTags:
// بعد از اجرای موفق یک Mutation، برچسب‌های مشخص‌شده را نامعتبر می‌کند.
// RTK Query تمام Queryهایی را که از این برچسب‌ها استفاده کرده‌اند، شناسایی می‌کند
// و در صورت داشتن Subscription فعال، آن‌ها را مجدداً Fetch می‌کند.
//
// نحوه استفاده از Tags:
//
// 1. LIST:
//    یک برچسب اختصاصی برای کل مجموعه بلاگ‌هاست.
//    برای عملیاتی استفاده می‌شود که تعداد یا ساختار لیست را تغییر می‌دهند.
//
// 2. ID:
//    هر بلاگ بر اساس شناسه خودش یک برچسب اختصاصی دارد.
//    برای شناسایی و به‌روزرسانی Cache مربوط به یک بلاگ مشخص استفاده می‌شود.
//
// مثال عملیات:
//
// - دریافت لیست بلاگ‌ها:
//   ارائه Tag مربوط به LIST و همچنین ID اختصاصی هر بلاگ.
//
// - دریافت یک بلاگ:
//   ارائه Tag اختصاصی همان بلاگ بر اساس ID.
//
// - افزودن بلاگ:
//   نامعتبر کردن LIST چون محتوای مجموعه بلاگ‌ها تغییر کرده است.
//
// - ویرایش بلاگ:
//   نامعتبر کردن ID همان بلاگ تا اطلاعات آن مجدداً دریافت شوند.
//
// - حذف بلاگ:
//   نامعتبر کردن ID همان بلاگ و LIST چون هم اطلاعات بلاگ حذف شده
//   و هم مجموعه بلاگ‌ها تغییر کرده است.
//
// نکته:
// نامعتبر شدن یک Tag به معنی حذف فوری اطلاعات از سرور یا Redux نیست.
// اگر Query مربوطه Subscription فعال داشته باشد، RTK Query آن را Refetch می‌کند.
// در غیر این صورت، هنگام استفاده مجدد از Query، اطلاعات تازه دریافت می‌شوند.
//
// ==================== END TAGS ====================