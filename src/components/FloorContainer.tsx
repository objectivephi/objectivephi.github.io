import { useState, useMemo, useCallback } from "react";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import {
  BLACK,
  GREY,
  OFFWHITE,
  WHITE,
  X_ROTATION,
  Y_ROTATION,
} from "../utils/constants";
import CardItem from "./CardItem";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 1000px;
  overflow: hidden;

  background-color: ${OFFWHITE};
  background-image: radial-gradient(
      circle at center,
      ${GREY} 0.1rem,
      transparent 0
    ),
    radial-gradient(circle at center, ${GREY} 0.1rem, transparent 0);
  background-size: 2rem 2rem;
  background-position: 0 0, 2rem 2rem;

  @media (max-width: 480px) {
    perspective: none;
  }
`;

const Floor = styled.div`
  box-shadow: 30px 30px 0px #000;
  border-radius: 10px;
  box-sizing: border-box;
  border: 3px solid ${BLACK};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px;
  width: 800px;
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

  @media (max-width: 480px) {
    perspective: none;
  }
`;

const CardContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  perspective: 1000px;

  @media (max-width: 480px) {
    perspective: none;
  }
`;

const ShuffleButton = styled.button`
  z-index: 1;
  user-select: none;
  margin: 100px 0 0 0;
  box-sizing: border-box;
  width: 150px;
  height: 75px;
  color: ${BLACK};
  border: 3px solid ${BLACK};
  border-radius: 5px;
  box-shadow: 5px 5px 0px 2px #000;
  background-color: ${OFFWHITE};
  font-family: monospace;
  font-size: 20px;
  transform: translateY(-5px);

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${WHITE};
    cursor: pointer;
  }

  &:active {
    transform: translateY(0px) translateX(5px);
    box-shadow: 0px 0px 0px 2px #000;
  }
`;

type TarotCard = {
  numeral: string;
  name: string;
  explanation: string;
  flippedExplanation: string;
  flipped?: boolean;
};

let tarotCards: TarotCard[] = [
  {
    numeral: "I",
    name: "The Magician",
    explanation: "Manifestation and resourcefulness.",
    flippedExplanation: "Manipulation, poor planning.",
  },
  {
    numeral: "II",
    name: "The High Priestess",
    explanation: "Intuition and higher powers.",
    flippedExplanation: "Hidden agendas, need to listen.",
  },
  {
    numeral: "III",
    name: "The Empress",
    explanation: "Fertility, creation, abundance.",
    flippedExplanation: "Creative block, dependence.",
  },
  {
    numeral: "IV",
    name: "The Emperor",
    explanation: "Authority, structure, control.",
    flippedExplanation: "Domination, excessive control.",
  },
  {
    numeral: "V",
    name: "The Hierophant",
    explanation: "Spiritual wisdom, tradition.",
    flippedExplanation: "Rebellion, subversiveness.",
  },
  {
    numeral: "VI",
    name: "The Lovers",
    explanation: "Love, harmony, choices.",
    flippedExplanation: "Disharmony, imbalance.",
  },
  {
    numeral: "VII",
    name: "The Chariot",
    explanation: "Control, willpower, success.",
    flippedExplanation: "Lack of control, aggression.",
  },
  {
    numeral: "VIII",
    name: "Strength",
    explanation: "Courage, patience, compassion.",
    flippedExplanation: "Self-doubt, weakness.",
  },
  {
    numeral: "IX",
    name: "The Hermit",
    explanation: "Soul-searching, introspection.",
    flippedExplanation: "Isolation, loneliness.",
  },
  {
    numeral: "X",
    name: "Wheel of Fortune",
    explanation: "Luck, cycles, change.",
    flippedExplanation: "Resistance to change, bad luck.",
  },
  {
    numeral: "XI",
    name: "Justice",
    explanation: "Fairness, truth, law.",
    flippedExplanation: "Unfairness, lack of accountability.",
  },
  {
    numeral: "XII",
    name: "The Hanged Man",
    explanation: "Pause, surrender, new perspectives.",
    flippedExplanation: "Delays, resistance, stalling.",
  },
  {
    numeral: "XIII",
    name: "Death",
    explanation: "Endings, transformation, transition.",
    flippedExplanation: "Resistance to change, personal transformation.",
  },
  {
    numeral: "XIV",
    name: "Temperance",
    explanation: "Balance, moderation, patience.",
    flippedExplanation: "Imbalance, excess, lack of long-term vision.",
  },
  {
    numeral: "XV",
    name: "The Devil",
    explanation: "Bondage, addiction, materialism.",
    flippedExplanation: "Freedom, release, restoring control.",
  },
  {
    numeral: "XVI",
    name: "The Tower",
    explanation: "Sudden change, upheaval.",
    flippedExplanation: "Avoidance of disaster, fear of change.",
  },
  {
    numeral: "XVII",
    name: "The Star",
    explanation: "Hope, faith, purpose.",
    flippedExplanation: "Lack of faith, despair.",
  },
  {
    numeral: "XVIII",
    name: "The Moon",
    explanation: "Illusion, fear, anxiety.",
    flippedExplanation: "Release of fear, repressed emotions.",
  },
  {
    numeral: "XIX",
    name: "The Sun",
    explanation: "Positivity, fun, success.",
    flippedExplanation: "Negativity, depression.",
  },
  {
    numeral: "XX",
    name: "Judgement",
    explanation: "Judgement, rebirth, inner calling.",
    flippedExplanation: "Self-doubt, refusal of self-examination.",
  },
  {
    numeral: "XXI",
    name: "The World",
    explanation: "Completion, integration, accomplishment.",
    flippedExplanation: "Lack of closure, incomplete goals.",
  },
  {
    numeral: "XXII",
    name: "The Fool",
    explanation: "Beginnings, innocence, spontaneity.",
    flippedExplanation: "Recklessness, risk-taking.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const shuffledTarotCards = shuffleArray(tarotCards).map((card) => ({
  ...card,
  flipped: Math.random() < 0.1,
}));

const selectedCards = shuffledTarotCards.slice(0, 3);

type State = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const FloorContainer = () => {
  const [cards, setCards] = useState<TarotCard[]>(selectedCards);
  const [keyId, setKeyId] = useState(0);
  const [{ x, y, dx, dy }, set] = useState<State>({
    x: X_ROTATION,
    y: Y_ROTATION,
    dx: 0,
    dy: 0,
  });

  const generateNewCards = useCallback(() => {
    const shuffledCards = shuffleArray(tarotCards);
    const newSelectedCards = shuffledCards.slice(0, 3).map((card) => ({
      ...card,
      flipped: Math.random() < 0.2,
    }));
    setKeyId((prevKeyId) => prevKeyId + 1); // Increment keyId to re-render
    setCards(newSelectedCards); // Set the new cards
  }, []);

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

  const floorStyle = useMemo(() => {
    if (window.innerWidth > 480) {
      return {
        transform: `rotateX(${x}deg) rotateZ(${y}deg) translateX(${dx}px) translateY(${dy}px)`,
      };
    } else {
      return {};
    }
  }, [x, y, dx, dy]);

  return (
    <Container {...bind()}>
      <Floor style={floorStyle}>
        <CardContainer key={keyId}>
          {cards.map((card) => (
            <CardItem
              key={card.name}
              numeral={card.numeral}
              text={card.name}
              flipped={card.flipped}
              explanation={card.explanation}
              flippedExplanation={card.flippedExplanation}
            />
          ))}
        </CardContainer>

        <ShuffleButton onClick={generateNewCards}>Shuffle</ShuffleButton>
      </Floor>
    </Container>
  );
};
export default FloorContainer;
