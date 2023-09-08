import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../../redux/Action/AdminAction";
import UserTable from "../Admin/UserTable";
import "../Admin/Css/UserList.css";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminUsers.users);
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );
  const obtenerUsuarios = async () => {
    try {
      if (userToken) {
        await dispatch(getUsers(userToken));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    setUserToken(sessionStorage.getItem("userToken"));
    obtenerUsuarios();
  }, [userToken]);

  const handleDeleteClick = (userId) => {
    dispatch(deleteUser({ _id: userId, token: userToken }));
  };
  const handleUpdateClick = (userId, updatedUserData) => {
    dispatch(
      updateUser({
        _id: userId,
        updatedUser: updatedUserData,
        token: userToken,
      })
    );
  };

  return (
    <div className="user-list-container">
      <div className="mt-4"></div>
      <div className="row">
        <div className="col-12">
          <UserTable
            users={users}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
