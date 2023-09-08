import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers } from "../../redux/Action/AdminAction";
import { setUser } from "../../redux/Action/UserAction";
import { setSelectedUser } from "../../redux/Reducers/UpdateAdminSlice";
import {
  setShowModal,
  selectUpdatedUser,
  setFormData,
} from "../../redux/Reducers/UpdateAdminSlice";
import "../Admin/Css/updateUsers.css";

const UpdateUsers = ({ user }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.updateAdmin.showModal);
  const formDataRedux = useSelector((state) => state.updateAdmin.formData);
  const selectedUser = useSelector((state) =>
    selectUpdatedUser(state, user._id)
  );
  const userToken = sessionStorage.getItem("userToken");
  const isAdmin = sessionStorage.getItem("userRol") === "admin";
  const currentUser = useSelector((state) => state.user);
  const userName = currentUser.userName;
  useEffect(() => {
    if (showModal && selectedUser) {
      dispatch(
        setFormData({
          name: selectedUser.name || "",
          email: selectedUser.email || "",
          password: selectedUser.password || "",
          role: selectedUser.role || "",
        })
      );
    } else {
      dispatch(
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        })
      );
    }
  }, [showModal, selectedUser, dispatch]);
  const handleOpenModal = () => {
    dispatch(setSelectedUser(user));
    dispatch(setShowModal(true));
  };
  const handleCloseModal = () => {
    dispatch(setShowModal(false));
  };
  const handleUpdate = async () => {
    try {
      if (!selectedUser || !selectedUser._id) {
        console.error("El ID del usuario es indefinido.");
        return;
      }
      await dispatch(
        updateUser({
          userId: selectedUser._id,
          updatedUser: formDataRedux,
          token: userToken,
        })
      );
      await dispatch(getUsers());
      const updatedUserName = formDataRedux.name;
      dispatch(setUser(updatedUserName));
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      setFormData({
        ...formDataRedux,
        [name]: value,
      })
    );
  };

  return (
    <div>
      <>
        <Button
          className="Update btn mx-2"
          variant="primary"
          onClick={handleOpenModal}
        >
          Update
        </Button>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="backupdate">
                  {" "}
                  <p className="mx-2 my-1 text-light"> Name </p>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formDataRedux.name}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="backupdate">
                  {" "}
                  <p className="mx-2 my-1 text-light">Email address </p>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formDataRedux.email}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label className="backupdate">
                  <p className="mx-2 my-1 text-light">Role</p>
                </Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="User"
                    type="checkbox"
                    id="userRole"
                    name="role"
                    value="user"
                    checked={formDataRedux.role === "user"}
                    onChange={handleFormChange}
                    disabled={isAdmin}
                  />
                  <Form.Check
                    inline
                    label="Admin"
                    type="checkbox"
                    id="adminRole"
                    name="role"
                    value="admin"
                    checked={formDataRedux.role === "admin"}
                    onChange={handleFormChange}
                  />
                </div>
              </Form.Group>

              <Button
                type="button"
                variant="primary"
                onClick={handleUpdate}
                className="mx-1"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseModal}
                className="mx-1"
              >
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default UpdateUsers;
