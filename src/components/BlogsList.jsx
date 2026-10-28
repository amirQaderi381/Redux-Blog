import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllBlogs } from "../reducers/BlogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";

const BlogsList = () => {
  const navigate = useNavigate();
  const blogs = useSelector((state) => selectAllBlogs(state));

  /*
   slice() creates a shallow copy of the array, preserving the original order.
   sort() sorts the copied array based on the comparison function.
   localeCompare() compares the date strings to determine their order.
   b.date.localeCompare(a.date) sorts posts from newest to oldest (descending order).
  */
  const orderedBlogs = blogs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedBlogs = orderedBlogs.map((blog) => (
    <article className="blog-excerpt" key={blog.id}>
      <h3>{blog.title}</h3>
      <div style={{ marginTop: "10px" , marginRight : "20px" }}>
        <ShowTime timestamp={blog.date} />
        <ShowAuthor userId={blog.user}/>
      </div>
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
