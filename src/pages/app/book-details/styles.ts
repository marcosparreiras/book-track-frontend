import styled from "styled-components";

export const BookDetailsContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  gap: 2rem;

  img {
    width: 95%;
    max-width: 300px;
    max-height: 390px;
    aspect-ratio: 1/1.3;
  }

  a {
    text-decoration: none;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme["green-300"]};
    background: none;
    color: ${(props) => props.theme["gray-100"]};
    display: inline-block;
    margin-bottom: 1rem;
    transition: 500ms;
  }

  a:hover {
    background-color: ${(props) => props.theme["green-500"]};
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    img {
      display: block;
      margin-inline: auto;
    }
  }
`;

export const BookContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${(props) => props.theme["gray-700"]};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CommentContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  form {
    display: flex;
    gap: 1rem;
    align-items: end;

    textarea {
      width: 95%;
      max-width: 600px;
      min-height: 100px;
      padding: 1rem;
      background: none;
      border: 1px solid ${(props) => props.theme["gray-500"]};
      resize: vertical;
      color: ${(props) => props.theme.white};
    }

    button {
      padding: 0.5rem;
      border: 1px solid ${(props) => props.theme["green-300"]};
      background: none;
      color: ${(props) => props.theme["gray-100"]};
      display: inline-block;
      margin-bottom: 1rem;
      transition: 500ms;
    }

    button:hover {
      background-color: ${(props) => props.theme["green-500"]};
    }
  }
`;

export const Comment = styled.div`
  display: flex;
  gap: 1rem;
  background-color: ${(props) => props.theme["gray-700"]};
  padding: 0.5rem;

  img {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme["green-700"]};
    object-fit: cover;
  }

  span {
    display: block;
  }
`;
