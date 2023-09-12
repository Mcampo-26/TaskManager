import React, { useState } from "react";
import UsersDelete from "./UsersDelete ";
import UpdateUsers from "./UpdateUsers";
import "../Admin/Css/UserTable.css";

const UserTable = ({ users }) => {
  const userToken = sessionStorage.getItem("userToken");
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };
  return (
    <div>
      <div>
        <h1 className="UserTable">Users List</h1>
      </div>
      <div className="user-table-container ">
        <table className="table table-striped">
          <thead>
            <tr className="table-responsive">
              <th className="bg-primary">Name</th>
              <th className="bg-primary">Email</th>
              <th className="bg-primary">Role</th>
              <th className="bg-primary">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className=" d-flex user-details ">
                    <UsersDelete userId={user._id} />
                    <UpdateUsers user={user} userToken={userToken} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
