import { Calendar, IdentificationBadge, MagnifyingGlass } from "phosphor-react";
import { BookCard, CardsContainer, HomeContainer, SearchBar } from "./styles";

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
            <div>
              <IdentificationBadge size={18} />
              <span>Martin Fowler</span>
            </div>
            <div>
              <Calendar size={18} />
              <span>{new Date().toLocaleString()}</span>
            </div>
            <span>
              {`The practice of enterprise application development has benefited
              from the emergence of many new enabling technologies. Multi-tiered
              object-oriented platforms, such as Java and .NET, have become
              commonplace. These new tools and technologies are capable of
              building powerful applications, but they are not easily
              implemented. Common failures in enterprise applications often
              occur because their developers do not understand the architectural
              lessons that experienced object developers have learned. Patterns
              of Enterprise Application Architecture is written in direct
              response to the stiff challenges that face enterprise application
              developers. The author, noted object-oriented designer Martin
              Fowler, noticed that despite changes in technology--from Smalltalk
              to CORBA to Java to .NET--the same basic design ideas can be
              adapted and applied to solve common problems. With the help of an
              expert group of contributors, Martin distills over forty recurring
              solutions into patterns. The result is an indispensable handbook
              of solutions that are applicable to any enterprise application
              platform. This book is actually two books in one. The first
              section is a short tutorial on developing enterprise applications,
              which you can read from start to finish to understand the scope of
              the book's lessons. The next section, the bulk of the book, is a
              detailed reference to the patterns themselves. Each pattern
              provides usage and implementation information, as well as detailed
              code examples in Java or C#. The entire book is also richly
              illustrated with UML diagrams to further explain the concepts.
              Armed with this book, you will have the knowledge necessary to
              make important architectural decisions about building an
              enterprise application and the proven patterns for use when
              building them. The topics covered include - Dividing an enterprise
              application into layers - The major approaches to organizing
              business logic - An in-depth treatment of mapping between objects
              and relational databases - Using Model-View-Controller to organize
              a Web presentation - Handling concurrency for data that spans
              multiple transactions - Designing distributed object interfaces
`.slice(0, 100) + " ..."}{" "}
            </span>
          </BookCard>
        ))}
      </CardsContainer>
    </HomeContainer>
  );
}
