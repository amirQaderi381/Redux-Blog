import { Link, useNavigate } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";
import { useGetBlogsQuery } from "../api/apiSlice";
import { useMemo } from "react";

const Blog = ({ blog }) => {
  return (
    <article className="blog-excerpt" key={blog.id}>
      <h3>{blog.title}</h3>
      <div style={{ marginTop: "10px", marginRight: "20px" }}>
        <ShowTime timestamp={blog.date} />
        <ShowAuthor userId={blog.user} />
      </div>
      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <ReactionButtons blog={blog} />
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        دیدن کامل پست
      </Link>
    </article>
  );
};

const BlogsList = () => {
  const navigate = useNavigate();

  const {
    data: blogs = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    status,
    error,
  } = useGetBlogsQuery();

  const sortedBlogs = useMemo(() => {
    return blogs.slice().sort((a, b) => b.date.localeCompare(a.date));
  }, [blogs]);

  let content;
  if (isLoading) {
    content = <Spinner text="بارگذاری..." />;
  } else if (isSuccess) {
    content = sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />);
  } else if (isError) {
    content = <div>{error}</div>;
  }

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
      {content}
    </section>
  );
};

export default BlogsList;
