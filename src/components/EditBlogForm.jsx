import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { selectBlogById, updatedBlog } from "../reducers/BlogSlice";

const EditBlogForm = () => {
  const {blogId} = useParams();
  const blog = useSelector(state => selectBlogById(state , blogId));

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = e => setTitle(e.target.value);
  const handleContentChange = e => setContent(e.target.value);

  const handleSubmitForm = () => {
    if(title , content) {
      dispatch(updatedBlog({id : blog.id , title , content}))
      setTitle("");
      setContent("");
      navigate(`/blogs/${blog.id}`);
    }
  }

  return (
    <section>
      <h2>ویرایش پست </h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input type="text" id="blogTitle" name="blogTitle" value={title} onChange={handleTitleChange} />
        <label htmlFor="blogContent">محتوای اصلی : </label>
        <textarea id="blogContent" name="blogContent" value={content} onChange={handleContentChange} />
        <button type="button" onClick={handleSubmitForm}>ویرایش پست</button>
      </form>
    </section>
  );
};

export default EditBlogForm;
