import { useState } from "react";
import { useDispatch } from "react-redux";
import { addedBlog } from "../reducers/BlogSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = e => setTitle(e.target.value);
  const handleContentChange = e => setContent(e.target.value);

  const handleSubmitForm = () => {
    if(title,content) {
        dispatch(addedBlog({id : nanoid() , title , content}));
        setTitle("");
        setContent("");
        navigate("/");
    }
  }
  return (
    <section>
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input type="text" id="blogTitle" name="blogTitle" onChange={handleTitleChange} />
        <label htmlFor="blogContent">محتوای اصلی : </label>
        <textarea id="blogContent" name="blogContent" onChange={handleContentChange} />
        <button type="button" onClick={handleSubmitForm}>خیره پست</button>
      </form>
    </section>
  );
};

export default CreateBlogForm;
