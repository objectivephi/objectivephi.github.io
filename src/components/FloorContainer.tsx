import React from "react";
import { useDrag } from "react-use-gesture";
import styled, { keyframes } from "styled-components";

const X_ROTATION = 30;
const Y_ROTATION = 30;

const fadeIn = keyframes`
  0%   {
    visibility: hidden;
    opacity: 0;
  }
  25%   {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
`;

const flipCard = keyframes`
  0%   {    
    transform: rotateY(${Y_ROTATION});
    filter: drop-shadow(25px 25px 20px #000);
    background-color: white;}
  100%  {    
    transform: rotateY(180deg);
    filter: drop-shadow(-25px 25px 20px #000);
    background-color: black;}
`;

const unflipCard = keyframes`
  0%  {    
  transform: rotateY(180deg);
  filter: drop-shadow(-25px 25px 20px #000);
  background-color: black;}
  100%   {    
    transform: rotateY(${Y_ROTATION});
    filter: drop-shadow(25px 25px 20px #000);
    background-color: white;}
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 1000px;
`;

const Floor = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 1200px;
  perspective: 1000px;
  background-image: radial-gradient(
      circle at center,
      black 0.25rem,
      transparent 0
    ),
    radial-gradient(circle at center, black 0.25rem, transparent 0);
  background-size: 1.3rem 1.3rem;
  background-position: 0 0, 0.65rem 0.65rem;
`;

const Card = styled.div`
  transform: translateZ(10px);
  filter: drop-shadow(25px 25px 20px #000);
  width: 100px;
  height: 200px;
  padding: 5px;
  border-radius: 10px;
  border: 3px solid black;
  background-color: white;
  background-image: radial-gradient(
      circle at center,
      black 0.1rem,
      transparent 0
    ),
    radial-gradient(circle at center, black 0.1rem, transparent 0);
  background-size: 1rem 1rem;
  background-position: 0 0, 0.5rem 0.5rem;
  animation: ${unflipCard} 0.25s;
  animation-fill-mode: forwards;
`;

const CardChild = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: pink;
  border-radius: 5px;
`;

const CardHolder = styled.div`
  width: fit-content;
  height: fit-content;
  &:hover ${Card} {
    animation: ${flipCard} 0.25s;
    animation-fill-mode: forwards;
  }
  &:hover ${Card} ${CardChild} {
    animation: ${fadeIn} 2s;
    animation-fill-mode: forwards;
  }
`;

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
        <CardHolder>
          <Card>
            <CardChild />
          </Card>
        </CardHolder>
      </Floor>
    </Container>
  );
};
export default FloorContainer;
