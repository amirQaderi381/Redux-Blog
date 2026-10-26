import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import SingleBlogPage from "../components/SingleBlogPage";
import CreateBlogForm from "../components/CreateBlogForm";
import EditBlogForm from "../components/EditBlogForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <h3 className="text-center">😕 متأسفانه چیزی پیدا نکردیم!</h3>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "/blogs/create-blog", element: <CreateBlogForm /> },
      { path: "/blogs/edit-blog/:blogId", element: <EditBlogForm /> },
      { path: "/blogs/:blogId", element: <SingleBlogPage /> },
    ],
  },
]);
