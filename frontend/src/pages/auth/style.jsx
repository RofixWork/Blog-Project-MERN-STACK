import styled from "styled-components";
const Wrapper = styled.section`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const LeftSide = styled.div`
  background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : null)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: overlay;

  @media (max-width: 768px) {
    display: none;
  }
`;
const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : null)};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.4);
    background-blend-mode: overlay;
  }
`;
const FormtTitle = styled.h2`
  font-size: 2rem;
  color: #111;

  @media (max-width: 768px) {
    color: white;
  }
`;

const Form = styled.form`
  max-width: 400px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;
const FormInput = styled.input`
  display: block;
  border: 1px solid #ccc;
  padding: 10px 14px;
  border-radius: 5px;
  width: 100%;
  font-size: 13px;

  &:focus {
    border: 1px solid cornflowerblue;
  }
`;
const FormButton = styled.button.attrs({
  type: "submit",
})`
  background-color: cornflowerblue;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;
  font-size: 15px;

  &:hover {
    background-color: #3371e4;
  }
`;

export {
  Wrapper,
  LeftSide,
  RightSide,
  Form,
  FormInput,
  FormButton,
  FormtTitle,
};
