import { Link } from "react-router-dom";
import type { Book } from "../../api/bookResource";
import DefaultBookImage from "../../assets/default-book.png";
import { BookCardContainer, BookInfo } from "./styles";
import { Calendar, IdentificationBadge } from "phosphor-react";

type BookCardProps = {
  book: Book;
};

export function BookCard(props: BookCardProps) {
  const { book } = props;
  return (
    <BookCardContainer key={book.id}>
      <img src={book.imageUrl ?? DefaultBookImage} alt="" />
      <h2>{book.title}</h2>
      <BookInfo>
        <IdentificationBadge size={18} />
        <span>{book.author}</span>
      </BookInfo>
      <BookInfo>
        <Calendar size={18} />
        <span>{new Date(book.publishedAt).getFullYear()}</span>
      </BookInfo>
      <Link to={`/book/${book.id}`}>Ver detalhes</Link>
    </BookCardContainer>
  );
}
