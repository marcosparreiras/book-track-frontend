import styled from "styled-components";

export const BookCreateContainer = styled.div`
  background-color: ${(props) => props.theme["gray-700"]};
  max-width: 800px;
  margin-inline: auto;
  margin-top: 2rem;
  width: 95%;
  padding: 1rem;

  form {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    form {
      flex-direction: column;
    }
  }
`;

export const BookImageContainer = styled.label`
  &:hover {
    img {
      opacity: 1;
    }
  }

  img {
    width: 310px;
    aspect-ratio: 1/1.4;
    cursor: pointer;
    object-fit: cover;
    opacity: 0.8;
    transition: 100ms;
  }

  input {
    display: none;
  }

  @media (max-width: 768px) {
    img {
      width: 260px;
      display: block;
      margin-inline: auto;
    }
  }
`;

export const BookContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;

  h1 {
    text-align: center;
  }

  button {
    background-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
    cursor: pointer;
    padding: 0.5rem;
    border: none;
    transition: 500ms;
  }

  button:hover {
    background-color: ${(props) => props.theme["green-300"]};
  }

  label {
    input {
      width: 100%;
    }

    span {
      display: block;
      margin-bottom: 0.3rem;
    }
  }

  textarea {
    resize: none;
    height: 100px;
  }

  input,
  textarea {
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }
`;
