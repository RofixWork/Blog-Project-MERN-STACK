import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  padding: 10px 30px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: clamp(16px, 3vw, 1.7rem);
  color: #333;
`;
const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;
const NavItem = styled(Link)`
  text-transform: capitalize;
  color: #333;
  font-size: clamp(13.5px, 2vw, 15px);
  font-weight: 500;
`;

export { Header, Container, Title, Nav, NavItem };
