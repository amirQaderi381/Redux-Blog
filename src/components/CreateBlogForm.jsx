import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedBlog } from "../reducers/BlogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId , setUserId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authors = useSelector(state => state.users);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleContentChange = e => setContent(e.target.value);
  const handleAuthorChange = e => setUserId(e.target.value);

  //متد  بررسی می‌کند که آیا تمام عناصر آرایه شرط موردنظر را برقرار می‌کنند یا خیر.
  //اگر همه عناصر شرط را داشته باشند، true برمی‌گرداند.
  const canSave = [title , content , userId].every(Boolean);

  const handleSubmitForm = () => {
    if(canSave) {
        dispatch(addedBlog(title , content , userId));
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
    }
  }
  return (
    <section>
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input type="text" id="blogTitle" name="blogTitle" onChange={handleTitleChange} />
        <label htmlFor="blogUserId">نویسنده :</label>
        <select onChange={handleAuthorChange}>
          <option>انتخاب نویسنده</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.fullname}
            </option>
          ))}
        </select>
        <label htmlFor="blogContent">محتوای اصلی : </label>
        <textarea id="blogContent" name="blogContent" onChange={handleContentChange} />
        <button type="button" disabled={!canSave} onClick={handleSubmitForm}>ذخیره پست</button>
        <button style={{marginRight : '1em'}} onClick={()=> navigate('/')}>انصراف </button>
      </form>
    </section>
  );
};

export default CreateBlogForm;
