import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectBlogById } from "../reducers/BlogSlice";

const SingleBlogPage = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => selectBlogById(state , blogId));

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <p className="blog-content">{blog.content}</p>
        <div>
          <Link className="button" to={`/blogs/edit-blog/${blog.id}`} >
            ویرایش پست
          </Link>
          <Link className="button" to={"/"} style={{marginRight : '1em'}}>
            بازگشت به صفحه قبل
          </Link>
        </div>
      </article>
    </section>
  );
};

export default SingleBlogPage;
