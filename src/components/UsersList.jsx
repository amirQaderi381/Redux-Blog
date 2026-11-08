import { useDispatch, useSelector } from "react-redux";
import {  selectAllUsers } from "../reducers/userSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const UsersList = () => {
  const [user, setUser] = useState("");

  const handleChangeUser = (e) => setUser(e.target.value);

  // const handleDelete = (userId) => {
  //   dispatch(removeUser(userId));
  // };

  const canSave = Boolean(user);

  // const handleSubmitForm = () => {
  //   if (canSave) {
  //     dispatch(addUser({ id: nanoid(), fullname: user }));
  //     setUser("");
  //   }
  // };

  const users = useSelector((state) => selectAllUsers(state));

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.fullname}</Link>
      <Link
        style={{ marginRight: "10px", color: "tomato" }}
        // onClick={() => handleDelete(user.id)}
      >
        &otimes;
      </Link>
    </li>
  ));

  return (
    <section>
      <form autoComplete="off">
        <label htmlFor="fullname">نام نویسنده : </label>
        <input
          type="text"
          name="fullname"
          value={user}
         // onChange={handleChangeUser}
        />
        <button type="button"
        //OnClick={handleSubmitForm}
         disabled={!canSave}>
          ساخت نویسنده
        </button>
      </form>
      <h2>لیست نویسندگان</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
