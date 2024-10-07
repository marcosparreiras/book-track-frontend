import {
  Calendar,
  CaretLeft,
  CaretRight,
  IdentificationBadge,
  MagnifyingGlass,
} from "phosphor-react";
import {
  BookCard,
  BookInfo,
  CardsContainer,
  HomeContainer,
  HomeSettings,
  PageNavigation,
  SearchBar,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import { useEffect, useState } from "react";
import api from "../../../api";
import DefaultBookImage from "../../../assets/default-book.png";

export function Home() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [titleSearch, setTitleSearch] = useState<string>("");

  useEffect(() => {
    fetchBooks(page, titleSearch).then((data) => {
      setBooks(data.books);
      setPage(data.page);
      setPageSize(data.pageSize);
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
        </PageNavigation>
      </HomeSettings>
      <CardsContainer>
        {books.length > 0 &&
          books.map((book) => (
            <BookCard key={book.id}>
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
            </BookCard>
          ))}
      </CardsContainer>
    </HomeContainer>
  );
}

type Book = {
  author: string;
  title: string;
  description: string;
  id: string;
  imageUrl: string | null;
  publishedAt: string;
};

async function fetchBooks(
  page: number,
  title: string
): Promise<{
  books: Book[];
  page: number;
  pageSize: number;
}> {
  let path = `/book?page=${page}`;
  if (title && title.length > 0) {
    path = path.concat(`&title=${title}`);
  }
  const apiResponse = await api.get(path);
  const { books, page: pageResult, pageSize } = apiResponse.data;
  return { books, page: pageResult, pageSize };
}
