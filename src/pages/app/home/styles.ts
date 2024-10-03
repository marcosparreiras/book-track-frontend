import styled from "styled-components";

export const HomeContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

export const SearchBar = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme["gray-700"]};
  border: 2px solid ${(props) => props.theme["gray-700"]};
  padding: 0.5rem;
  width: 95%;
  max-width: 500px;

  &:focus-within {
    border: 2px solid ${(props) => props.theme["green-300"]};
  }

  input {
    color: ${(props) => props.theme["gray-100"]};
    width: 100%;
    background: none;
    border: none;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  height: 100%;
  margin-top: 2rem;
`;

export const BookCard = styled.div`
  width: 280px;
  height: 450px;
  padding: 0.3rem;
  background-color: ${(props) => props.theme["gray-700"]};

  img {
    width: 80%;
    height: auto;
    object-fit: cover;
    display: block;
    margin-inline: auto;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  > span {
    display: block;
    margin-top: 0.5rem;
  }
`;
