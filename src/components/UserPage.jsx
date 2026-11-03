import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllBlogs, selectUserBlogs } from "../reducers/BlogSlice";
import { selectUserById } from "../reducers/userSlice";

const UserPage = () => {

    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, userId));

    // const userBlogs = useSelector((state) => {
    //     const allBlogs = selectAllBlogs(state);
    //     return allBlogs.filter(blog => blog.user === userId);
    // });

    //memorize selectors
    const userBlogs = useSelector((state) => selectUserBlogs(state , userId));

    const titleBlogs = userBlogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
    ));

   return (
     <section>
        <h2>{user.fullname}</h2>
        <ul>
            {
                userBlogs.length > 0 ? titleBlogs : (
                    <li style={{listStyle: "none"}}>نویسنده ما هیچ پستی تا الان منتشر نکرده</li>
                )
            }
        </ul>
     </section>
   )
}
export default UserPage;