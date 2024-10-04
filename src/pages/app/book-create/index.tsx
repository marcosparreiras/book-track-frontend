import {
  BookContentContainer,
  BookCreateContainer,
  BookImageContainer,
} from "./styles";
import DefaultBookImg from "../../../assets/default-book.png";

export function BookCreate() {
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
