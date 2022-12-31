import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";

const Loader = () => {
  return (
    <Wrapper>
      <BeatLoader />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
