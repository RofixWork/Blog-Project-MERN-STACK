import styled from "styled-components";
// styled
export const CreatePost = styled.section`
  padding: 80px 0;
`;
export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 14px;
  }
`;
export const Wrapper = styled.div`
  padding: 14px 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px 8px;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ecf0f1;
  display: block;
  position: relative;

  &:focus {
    border-bottom: 2px solid #3498db;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
export const TextArea = styled.textarea.attrs({
  cols: 30,
  rows: 5,
  maxLength: 150,
  placeholder: "Meta Description...",
})`
  width: 100%;
  padding: 10px 8px;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ecf0f1;
  display: block;
  position: relative;
  resize: none;
`;

export const FileLabel = styled.label`
  background-color: #3498db;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 250ms ease-in-out;
  &:hover {
    background-color: #2980b9;
  }
`;
export const FormButttonSubmit = styled.button.attrs({
  type: "submit",
})`
  background-color: #487eb0;
  color: white;
  padding: 8px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  display: block;
  text-transform: uppercase;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: #40739e;
  }
`;

export const UpdateButton = styled.button`
  background-color: #44bd32;
  color: white;
  width: 100px;
  font-size: 14px;
  padding: 8px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
export const ImagePreview = styled.div`
  width: 100%;
  height: 400px;
  outline: 1px solid #ccc;
  outline-offset: 3px;
  border-radius: 3px;

  @media (max-width: 768px) {
    height: 300px;
  }

  & img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
`;
export const Length = styled.p`
  font-size: 14px;
  font-style: italic;
`;
export const ArrowBack = styled.div`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: #487eb0;
`;
