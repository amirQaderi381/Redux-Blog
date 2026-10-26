import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleBlogPage = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId),
  );

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
      </article>
    </section>
  );
};

export default SingleBlogPage;
