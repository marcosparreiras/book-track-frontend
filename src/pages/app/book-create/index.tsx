import {
  BookContentContainer,
  BookCreateContainer,
  BookImageContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";
import { useUserContext } from "../../../contexts/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function BookCreate() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);
  return (
    <BookCreateContainer>
      <form>
        <BookImageContainer>
          <img src={DefaultBookImg} alt="" />
          <input type="file" />
        </BookImageContainer>
        <BookContentContainer>
          <h1>Adicionar novo livro</h1>
          <input type="text" placeholder="título" />
          <input type="text" placeholder="autor" />
          <label>
            <span>Data de publicação</span>
            <input type="date" />
          </label>
          <textarea placeholder="descrição" />
          <button type="submit">Adicionar</button>
        </BookContentContainer>
      </form>
    </BookCreateContainer>
  );
}
