import { Star } from "phosphor-react";
import { RateStarsContainer } from "./styles";

export function RateStars(props: {
  rate: number;
  setRate?: (rate: number) => void;
}) {
  return (
    <RateStarsContainer>
      {!props.setRate &&
        Array.from({ length: 5 }).map((_, index) => (
          <Star
            weight={index + 1 <= props.rate ? "fill" : "regular"}
            key={index}
          />
        ))}
      {props.setRate &&
        Array.from({ length: 5 }).map((_, index) => (
          <Star
            weight={index + 1 <= props.rate ? "fill" : "regular"}
            key={index}
            onClick={() => props.setRate!(index + 1)}
            style={{ cursor: "pointer" }}
          />
        ))}
    </RateStarsContainer>
  );
}
