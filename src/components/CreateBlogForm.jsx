import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useAddNewBlogMutation } from "../api/apiSlice";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../reducers/UserSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addNewBlog , {isLoading}] = useAddNewBlogMutation();

  const navigate = useNavigate();

  const authors = useSelector((state) => selectAllUsers(state));

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSubmitForm = async () => {
    if (canSave) {
      try {
        await addNewBlog({
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
          }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("failed to save new blog");
      }
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
