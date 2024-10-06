import { Star } from "phosphor-react";
import { RateStarsContainer } from "./styles";
import { useState } from "react";

export function RateStars(props: { enabled?: boolean }) {
  const [rate, setRate] = useState<number>(1);

  return (
    <RateStarsContainer>
      {!props.enabled &&
        Array.from({ length: 5 }).map((_, index) => (
          <Star weight={index + 1 <= rate ? "fill" : "regular"} key={index} />
        ))}
      {props.enabled &&
        Array.from({ length: 5 }).map((_, index) => (
          <Star
            weight={index + 1 <= rate ? "fill" : "regular"}
            key={index}
            onClick={() => setRate(index + 1)}
            style={{ cursor: "pointer" }}
          />
        ))}
    </RateStarsContainer>
  );
}
