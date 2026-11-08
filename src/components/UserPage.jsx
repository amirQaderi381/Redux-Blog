import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllBlogs, selectUserBlogs } from "../reducers/BlogSlice";
import { selectUserById, useGetUsersQuery } from "../reducers/UserSlice";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "../api/apiSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));

  // const userBlogs = useSelector((state) => {
  //     const allBlogs = selectAllBlogs(state);
  //     return allBlogs.filter(blog => blog.user === userId);
  // });

  //memorize selectors
  //const userBlogs = useSelector((state) => selectUserBlogs(state , userId));

  //another way
  const selectUserBlogs = useMemo(() => {
    const emptyArray = [];
    return createSelector(
      [(res) => res.data, (res, userId) => userId],
      (data, userId) => data?.filter((blog) => blog.user === userId) ?? emptyArray,
    );
  }, []);

  const {userBlogs} = useGetBlogsQuery(undefined, {
    //با selectFromResult می‌تونیم مشخص کنیم کامپوننت چه بخشی از نتیجه رو دریافت کنه.
    selectFromResult: (queryResult) => ({
     //تمام اطلاعات قبلی رو نگه می‌داره.
      ...queryResult,
      //یک فیلد جدید به نتیجه اضافه می‌کنه.
      userBlogs: selectUserBlogs(queryResult, userId),
    }),
  });

  const titleBlogs = userBlogs.map((blog) => (
    <li key={blog.id}>{blog.title}</li>
  ));

  return (
    <section>
      <h2>{user.fullname}</h2>
      <ul>
        {userBlogs.length > 0 ? (
          titleBlogs
        ) : (
          <li style={{ listStyle: "none" }}>
            نویسنده ما هیچ پستی تا الان منتشر نکرده
          </li>
        )}
      </ul>
    </section>
  );
};
export default UserPage;
