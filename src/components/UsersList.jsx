import { useSelector } from "react-redux";
import { selectAllUsers } from "../reducers/userSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector((state) => selectAllUsers(state));
  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.fullname}</Link>
    </li>
  ));

  return (
    <section>
      <h2>لیست نویسندگان</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
