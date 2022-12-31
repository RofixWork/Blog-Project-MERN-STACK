import styled from "styled-components";

const Container = ({ children }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

export default Container;

const ContainerStyle = styled.div`
  padding: 0 30px;
`;
