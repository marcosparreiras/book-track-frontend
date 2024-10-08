import styled from "styled-components";

export const CommentDiv = styled.div`
  display: flex;
  gap: 1rem;
  background-color: ${(props) => props.theme["gray-700"]};
  padding: 0.5rem;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme["green-700"]};
    object-fit: cover;
  }

  button {
    cursor: pointer;
    background-color: ${(props) => props.theme["red-700"]};
    border: none;
    color: ${(props) => props.theme["gray-100"]};
    padding: 0.5rem;
    margin-left: auto;
    height: fit-content;
  }

  button:hover {
    background-color: ${(props) => props.theme["red-500"]};
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
