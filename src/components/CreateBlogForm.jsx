import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedBlog, addNewBlog } from "../reducers/BlogSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authors = useSelector((state) => selectAllUsers(state));

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setUserId(e.target.value);

  //متد  بررسی می‌کند که آیا تمام عناصر آرایه شرط موردنظر را برقرار می‌کنند یا خیر.
  //اگر همه عناصر شرط را داشته باشند، true برمی‌گرداند.
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handleSubmitForm = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          addNewBlog({
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumpup: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          }),
        );
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("failed to save new blog");
      } finally {
        setRequestStatus("idle");
      }

      // dispatch(addedBlog(title , content , userId));
      // setTitle("");
      // setContent("");
      // setUserId("");
      // navigate("/");
    }
  };
  return (
    <section>
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          onChange={handleTitleChange}
        />
        <label htmlFor="blogUserId">نویسنده :</label>
        <select onChange={handleAuthorChange}>
          <option>انتخاب نویسنده</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.fullname}
            </option>
          ))}
        </select>
        <label htmlFor="blogContent">محتوای اصلی : </label>
        <textarea
          id="blogContent"
          name="blogContent"
          onChange={handleContentChange}
        />
        <button type="button" disabled={!canSave} onClick={handleSubmitForm}>
          ذخیره پست
        </button>
        <button style={{ marginRight: "1em" }} onClick={() => navigate("/")}>
          انصراف{" "}
        </button>
      </form>
    </section>
  );
};

export default CreateBlogForm;
