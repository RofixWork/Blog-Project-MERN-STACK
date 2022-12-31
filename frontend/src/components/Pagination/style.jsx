import styled from "styled-components";

export const Paginate = styled.ul`
  display: flex;
  justify-content: center;
  padding: 40px;
  gap: 10px;
`;
export const PaginateItem = styled.li`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background-color: #70a1ff;
  color: white;
  font-size: 14px;
  border-radius: 5px;

  &:hover,
  &.active {
    background-color: #1e90ff;
  }
`;
