import React, { useEffect, useState } from "react";
import { Nav, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import { logoutUser } from "../redux/Action/UserAction";
import ModalPost from "./Task/ModalPost";
import AdminNavbar from "../Components/Admin/AdminNavbar";

import "../Components/Task/css/Nav.css";

const Navbar = () => {
  const userToken = sessionStorage.getItem("userToken");
  const isAdmin = sessionStorage.getItem("userRol") === "admin"; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const isNotFoundPage = location.pathname === "/notfound";
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

 

  const handleLogoClick = () => {
    if (userToken) {
      if (isAdmin) {
        navigate("/adminPage");
      } else {
        navigate("/taskPage");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <Nav
      activeKey="/"
      className="fixed-top  nav justify-content-between col-lg-12 col-md-12 col-sm-12"    >
      <Nav.Item className="mx-5">
        <Row className="d-flex align-items-center">
          <Col xs="12" className="text-center">
            <div
              className="d-flex text-light text-decoration-none  logoclass"
              onClick={handleLogoClick}
            >
              <img  
                src={Logo}
                alt="TaskGenius Logo"
                height="50"
                className="mr-3 logoclassimg"
              />
              <h1 className="text-light Nav-title m-0">TaskGenius</h1>
            </div>
          </Col>
        </Row>
      </Nav.Item>
      {userToken && !isHomePage && (
        <Nav.Item className="mx-auto">
          <h1 className="text-light my-3 Nav-title">
            Welcome 
          </h1>
        </Nav.Item>
      )}
      {userToken && !isHomePage && (
        <Nav.Item className="mr-5 d-flex">
          <Button
            variant="danger"
            className="logout-button my-3 mr-2"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {isAdmin ? (
            <AdminNavbar />
          ) : (
            <Button
              variant="primary"
              className="new-task-button my-3"
              onClick={openModal}
            >
              New Task
            </Button>
          )}
          <ModalPost showModal={showModal} closeModal={closeModal} />
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
