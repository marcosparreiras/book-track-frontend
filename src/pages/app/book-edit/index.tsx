import {
  BookContentContainer,
  BookEditContainer,
  BookImageContainer,
  ButtonContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import { useEffect } from "react";

export function BookEdit() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);
  return (
    <BookEditContainer>
      <form>
        <BookImageContainer>
          <img src={DefaultBookImg} alt="" />
          <input type="file" />
        </BookImageContainer>
        <BookContentContainer>
          <h1>Editar livro</h1>
          <input type="text" placeholder="título" />
          <input type="text" placeholder="autor" />
          <label>
            <span>Data de publicação</span>
            <input type="date" />
          </label>
          <textarea placeholder="descrição" />
          <ButtonContainer>
            <Link to="..">Cancelar</Link>
            <button type="submit">Editar</button>
          </ButtonContainer>
        </BookContentContainer>
      </form>
    </BookEditContainer>
  );
}
