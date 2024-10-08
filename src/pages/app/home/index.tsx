import { CaretLeft, CaretRight, MagnifyingGlass } from "phosphor-react";
import {
  CardsContainer,
  HomeContainer,
  HomeSettings,
  PageNavigation,
  SearchBar,
} from "./styles";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { fetchBooks, type Book } from "../../../api/bookResource";
import { toast } from "react-toastify";
import { BookCard } from "../../../components/book-card";

export function Home() {
  useAuth("user");
  const { user } = useUserContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [titleSearch, setTitleSearch] = useState<string>("");

  useEffect(() => {
    fetchBooks({ page, title: titleSearch })
      .then((data) => {
        setBooks(data.books);
        setPage(data.page);
        setPageSize(data.pageSize);
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }, [titleSearch, page, setBooks, setPage, setPageSize]);

  return (
    <HomeContainer>
      <HomeSettings>
        <SearchBar>
          <MagnifyingGlass size={24} />
          <input
            type="text"
            placeholder="Busque por títulos"
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
        </SearchBar>
        <PageNavigation>
          <span>Página: {page}</span>
          <CaretLeft
            size={24}
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
              }
            }}
          />
          <CaretRight
            size={24}
            onClick={() => {
              if (books.length === pageSize) {
                setPage((prev) => prev + 1);
              }
            }}
          />
          {user?.isAdmin && <Link to="/book/create">Adicionar Livro</Link>}
        </PageNavigation>
      </HomeSettings>
      <CardsContainer>
        {books.length > 0 &&
          books.map((book) => <BookCard book={book} key={book.id} />)}
      </CardsContainer>
    </HomeContainer>
  );
}
