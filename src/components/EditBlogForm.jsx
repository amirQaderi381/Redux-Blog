import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogQuery, useUpdateBlogMutation } from "../api/apiSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();

 // The blog is already fetched and cached by SingleBlogPage.
 // RTK Query reuses the cached data instead of making another API request.
 // Solve issue : Using Specific Tags
  const { data: blog } = useGetBlogQuery(blogId);

  const [editBlog, { isLoading }] = useUpdateBlogMutation();

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmitForm = async () => {
    const editedBlog = {
      id: blogId,
      date: blog.date,
      title,
      content,
      user: blog.user,
      reactions: {
        thumpup: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    };
    if ((title, content)) {
      (await editBlog({...editedBlog}).unwrap(), setTitle(""));
      setContent("");
      navigate(`/blogs/${blog.id}`);
    }
  };

  return (
    <section>
      <h2>ویرایش پست </h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="blogContent">محتوای اصلی : </label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleSubmitForm}>
          ویرایش پست
        </button>
      </form>
    </section>
  );
};

export default EditBlogForm;
