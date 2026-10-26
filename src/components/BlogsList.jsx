import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllBlogs } from "../reducers/BlogSlice";

const BlogsList = () => {
  const navigate = useNavigate();
  const blogs = useSelector((state) => selectAllBlogs(state));

  const renderedBlogs = blogs.map((blog) => (
    <article className="blog-excerpt" key={blog.id}>
      <h3>{blog.title}</h3>
      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        دیدن کامل پست
      </Link>
    </article>
  ));
  return (
    <section className="blog-list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <h2>تمام پست ها</h2>
        <button
          className="accent-button"
          onClick={() => {
            navigate("blogs/create-blog");
          }}
        >
          ساخت پست جدید
        </button>
      </div>
      {renderedBlogs}
    </section>
  );
};

export default BlogsList;
