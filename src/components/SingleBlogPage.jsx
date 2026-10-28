import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletedBlog, selectBlogById } from "../reducers/BlogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) => selectBlogById(state, blogId));

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من</h2>
      </section>
    );
  }

  const handleDelete = () => {
    if (blog) {
      dispatch(deletedBlog({ id: blog.id }));
      navigate("/");
    }
  };
  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <div style={{marginTop : "10px" , marginRight : "20px"}}>
          <ShowTime timestamp={blog.date}/>
          <ShowAuthor userId={blog.user}/>
        </div>
        <p className="blog-content">{blog.content}</p>
        <div>
          <Link className="button" to={`/blogs/edit-blog/${blog.id}`}>
            ویرایش پست
          </Link>
          <button
            onClick={handleDelete}
            className="muted-button"
            style={{ marginRight: "1em" }}
          >
             حذف پست
          </button>
        </div>
      </article>
    </section>
  );
};

export default SingleBlogPage;
