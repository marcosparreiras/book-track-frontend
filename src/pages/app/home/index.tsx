import { Calendar, IdentificationBadge, MagnifyingGlass } from "phosphor-react";
import {
  BookCard,
  BookInfo,
  CardsContainer,
  HomeContainer,
  SearchBar,
} from "./styles";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <HomeContainer>
      <SearchBar>
        <MagnifyingGlass size={24} />
        <input type="text" placeholder="Busque por títulos" />
      </SearchBar>
      <CardsContainer>
        {Array.from({ length: 10 }).map((_) => (
          <BookCard>
            <img
              src="https://m.media-amazon.com/images/I/41wMB8pUTwL._SX342_SY445_.jpg"
              alt=""
            />
            <h2>Patterns Of Enterpsier Application Architecture</h2>
            <BookInfo>
              <IdentificationBadge size={18} />
              <span>Martin Fowler</span>
            </BookInfo>
            <BookInfo>
              <Calendar size={18} />
              <span>{new Date().toLocaleString()}</span>
            </BookInfo>
            <Link to="/book/12">Ver detalhes</Link>
          </BookCard>
        ))}
      </CardsContainer>
    </HomeContainer>
  );
}
