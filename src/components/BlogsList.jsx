import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);

  const renderedBlogs = blogs.map((blog) => (
    <article className="blog-excerpt" key={blog.id}>
      <h3>{blog.title}</h3>
      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <Link to={`/blogs/${blog.id}`} className="button muted-button" >دیدن کامل پست</Link>
    </article>
  ));
  return (
    <section className="blog-list">
      <h2>تمام پست ها</h2>
      {renderedBlogs}
    </section>
  );
};

export default BlogsList;
