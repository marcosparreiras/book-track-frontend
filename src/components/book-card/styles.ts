import styled from "styled-components";

export const BookCardContainer = styled.div`
  width: 280px;
  height: 410px;
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) => props.theme["gray-700"]};

  &:hover {
    img {
      opacity: 1;
      filter: brightness(1.1);
    }
  }

  img {
    width: 80%;
    aspect-ratio: 1/1.4;
    max-height: 240px;
    display: block;
    margin-inline: auto;
    opacity: 0.8;
    transition: 100ms;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  > a {
    text-decoration: none;
    text-align: center;
    display: block;
    margin-top: 0.5rem;
    width: 100%;
    cursor: pointer;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme["green-500"]};
    border: none;
    padding: 0.3rem;
    transition: 500ms;
  }

  > a:hover {
    background: ${(props) => props.theme["green-300"]};
  }
`;

export const BookInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${(props) => props.theme["gray-300"]};
`;
