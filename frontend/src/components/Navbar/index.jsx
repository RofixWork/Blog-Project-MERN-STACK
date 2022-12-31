import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../../app/slices/authSlice";
import { Container, Header, Nav, Title, NavItem } from "./style";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  // dispatch
  const dispatch = useDispatch();

  // logout
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(LOGOUT());
  };

  return (
    <Header>
      <Container>
        <Link to="/">
          <Title>Blog</Title>
        </Link>
        <Nav>
          {user ? (
            <>
              <NavItem to="/create">create a post</NavItem>
              <NavItem to="/dashboard">dashboard</NavItem>
              <NavItem>{user.username}</NavItem>
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/login">login</NavItem>
              <NavItem to="/register">register</NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Header>
  );
};

export default Navbar;
