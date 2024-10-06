import { Calendar, IdentificationBadge } from "phosphor-react";
import {
  BookDetailsContainer,
  CommentContainer,
  Comment,
  InfoItem,
  BookContainer,
  CommentHeader,
} from "./styles";
import { Link } from "react-router-dom";
import { RateStars } from "../../../components/rate-stars";

export function BookDetails() {
  return (
    <BookDetailsContainer>
      <img
        src="https://m.media-amazon.com/images/I/41wMB8pUTwL._SX342_SY445_.jpg"
        alt=""
      />
      <div>
        <Link to="/book/12/edit">Editar</Link>
        <BookContainer>
          <h1>Patterns Of Enterprise Application Architecture</h1>
          <InfoItem>
            <IdentificationBadge size={18} />
            <span>Martin Fowler</span>
          </InfoItem>
          <InfoItem>
            <Calendar size={18} />
            <span>{new Date().toLocaleString()}</span>
          </InfoItem>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            sapiente aut exercitationem consequatur. Corrupti repellendus
            adipisci laboriosam ratione architecto. Hic nesciunt molestiae eaque
            illo nobis reprehenderit deleniti error, excepturi eius? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolorum sapiente aut
            exercitationem consequatur. Corrupti repellendus adipisci laboriosam
            ratione architecto. Hic nesciunt molestiae eaque illo nobis
            reprehenderit deleniti error, excepturi eius? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolorum sapiente aut
            exercitationem consequatur. Corrupti repellendus adipisci laboriosam
            ratione architecto. Hic nesciunt molestiae eaque illo nobis
            reprehenderit deleniti error, excepturi eius? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolorum sapiente aut
            exercitationem consequatur. Corrupti repellendus adipisci laboriosam
            ratione architecto. Hic nesciunt molestiae eaque illo nobis
            reprehenderit deleniti error, excepturi eius?
          </p>
        </BookContainer>
        <CommentContainer>
          <form>
            <div>
              <RateStars enabled />
              <textarea placeholder="Deixe o seu comentário" />
            </div>
            <button type="submit">Enviar</button>
          </form>
          {Array.from({ length: 4 }).map((_) => (
            <Comment>
              <img src="http://github.com/marcosparreiras.png" />
              <div>
                <CommentHeader>
                  <span>John Doe</span>
                  <RateStars />
                </CommentHeader>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, eligendi. Ullam eos quaerat et? Consequatur rem unde
                  sed sequi nulla a quia eius deserunt, ratione perferendis
                  iusto, dolore tempore eligendi.
                </p>
              </div>
            </Comment>
          ))}
        </CommentContainer>
      </div>
    </BookDetailsContainer>
  );
}
