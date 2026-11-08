
import { Link, useNavigate, useParams } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import { useGetBlogQuery } from "../api/apiSlice";
import Spinner from "./Spinner";

const SingleBlogPage = () => {

  const { blogId } = useParams();
  const { data: blog, isFetching, isSuccess } = useGetBlogQuery(blogId);
  const navigate = useNavigate();

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من</h2>
      </section>
    );
  }

  const handleDelete = () => {
    if (blog) {
      //dispatch(destroyBlog(blog.id))
      navigate("/");
    }
  };

  let content;
  if (isFetching) {
    content = <Spinner text="در حال بارگذاری..." />;
  } else if (isSuccess) {
    content = (
      <article className="blog">
        <h2>{blog.title}</h2>
        <div style={{ marginTop: "10px", marginRight: "20px" }}>
          <ShowTime timestamp={blog.date} />
          <ShowAuthor userId={blog.user} />
        </div>
        <p className="blog-content">{blog.content}</p>
        <ReactionButtons blog={blog} />
        <div style={{ marginTop: "10px" }}>
          <Link className="button" to={`/blogs/edit-blog/${blog.id}`}>
            ویرایش پست
          </Link>
          <button
            //onClick={handleDelete}
            className="muted-button"
            style={{ marginRight: "1em" }}
          >
            حذف پست
          </button>
        </div>
      </article>
    );
  }
  return <section>{content}</section>;
};

export default SingleBlogPage;
