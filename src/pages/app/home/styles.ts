import styled from "styled-components";

export const HomeContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

export const HomeSettings = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
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

export const PageNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;

  svg:hover {
    color: ${(props) => props.theme["green-500"]};
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
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  height: 100%;
  margin-top: 2rem;
`;
