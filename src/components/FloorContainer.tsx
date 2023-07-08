import React from "react";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import { BLACK, OFFWHITE, X_ROTATION, Y_ROTATION } from "../utils/constants";
import Card from "./CardItem";
import CardItem from "./CardItem";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 1000px;
  background-color: ${OFFWHITE};
`;

const Floor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  position: absolute;
  top: 10vh;
  left: 10vw;
  width: 1200px;
  height: 600px;
  perspective: 1000px;
  background-color: ${OFFWHITE};
  background-image: radial-gradient(
      circle at center,
      ${BLACK} 0.25rem,
      transparent 0
    ),
    radial-gradient(circle at center, ${BLACK} 0.25rem, transparent 0);
  background-size: 1.3rem 1.3rem;
  background-position: 0 0, 0.65rem 0.65rem;
`;

let tarotCards = [
  { numeral: "I", name: "The Magician" },
  { numeral: "II", name: "The High Priestess" },
  { numeral: "III", name: "The Empress" },
  { numeral: "IV", name: "The Emperor" },
  { numeral: "V", name: "The Hierophant" },
  { numeral: "VI", name: "The Lovers" },
  { numeral: "VII", name: "The Chariot" },
  { numeral: "VIII", name: "Strength" },
  { numeral: "IX", name: "The Hermit" },
  { numeral: "X", name: "Wheel of Fortune" },
  { numeral: "XI", name: "Justice" },
  { numeral: "XII", name: "The Hanged Man" },
  { numeral: "XIII", name: "Death" },
  { numeral: "XIV", name: "Temperance" },
  { numeral: "XV", name: "The Devil" },
  { numeral: "XVI", name: "The Tower" },
  { numeral: "XVII", name: "The Star" },
  { numeral: "XVIII", name: "The Moon" },
  { numeral: "XIX", name: "The Sun" },
  { numeral: "XX", name: "Judgement" },
  { numeral: "XXI", name: "The World" },
  { numeral: "XXII", name: "The Fool" },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const shuffledTarotCards = shuffleArray<{ numeral: string; name: string }>(
  tarotCards
);
const selectedCards = shuffledTarotCards.slice(0, 3);

type State = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const FloorContainer = () => {
  const [{ x, y, dx, dy }, set] = React.useState<State>({
    x: X_ROTATION,
    y: Y_ROTATION,
    dx: 0,
    dy: 0,
  });

  const bind = useDrag(({ down, delta: [dx, dy] }) => {
    if (down) {
      set((state) => ({
        x: state.x,
        y: state.y,
        dx: state.dx + dx,
        dy: state.dy + dy,
      }));
    }
  });

  return (
    <Container {...bind()}>
      <Floor
        style={{
          transform: `rotateX(${x}deg) rotateZ(${y}deg) translateX(${dx}px) translateY(${dy}px)`,
        }}
      >
        {selectedCards.map((card) => (
          <CardItem key={card.name} numeral={card.numeral} text={card.name} />
        ))}
      </Floor>
    </Container>
  );
};
export default FloorContainer;
