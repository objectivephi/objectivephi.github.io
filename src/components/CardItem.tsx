import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { BLACK, OFFWHITE, WHITE, Y_ROTATION } from "../utils/constants";
import Beethoven from "./Beethoven";

const inspect = keyframes`
  0%   {
    transform: rotateZ(0deg) translateZ(0px);
    z-index: 2;
  }
  100% {
    transform: rotateZ(-30deg) translateZ(600px);
    z-index: 3; 
  }
`;

const uninspect = keyframes`
  0%   {
    transform: rotateZ(-30deg) translateZ(600px);
    z-index: 3;
  }
  100% {
    transform: rotateZ(0deg) translateZ(0px);
    z-index: 2; 
  }
`;

const fadeIn = keyframes`
  0%   {
    visibility: hidden;
    opacity: 0;
  }
  40%   {
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
    transform: rotateY(180deg);
    box-shadow: -15px 15px 0px #000;
    background-color: ${OFFWHITE};}
  100%  {    
    transform: rotateY(${Y_ROTATION});
    box-shadow: 15px 15px 0px #000;
    background-color: ${BLACK};}
`;

const unflipCard = keyframes`
  0%  {    
    transform: rotateY(180deg);
    box-shadow: -15px 15px 0px #000;
    background-color: ${BLACK};}
  100%   {    
    transform: rotateY(${Y_ROTATION});
    box-shadow: 15px 15px 0px #000;
    background-color: ${OFFWHITE};}
`;

const Card = styled.div`
  transform: translateZ(10px);
  width: 100px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  box-sizing: border-box;
  border: 3px solid ${BLACK};

  background-image: radial-gradient(
      circle at center,
      ${BLACK} 0.1rem,
      transparent 0
    ),
    radial-gradient(circle at center, ${BLACK} 0.1rem, transparent 0);
  background-size: 1rem 1rem;
  background-position: 0 0, 0.5rem 0.5rem;
  animation: ${unflipCard} 0.25s;
  animation-fill-mode: forwards;
`;

interface CardChildProps {
  flipped?: boolean;
}

const CardChild = styled.div<CardChildProps>`
  width: 100%;
  height: 100%;
  opacity: 0;

  background-color: ${BLACK};
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.flipped
      ? css`
          transform: rotateZ(180deg);
        `
      : css`
          transform: rotateZ(0deg);
        `}
`;

const CardContent = styled.pre`
  box-sizing: border-box;
  color: ${WHITE};
  width: 100%;
  padding: 25px 25px 0 5px;
  margin: 0;
  font-size: 10px;
  white-space: pre-wrap;
`;

interface CardHolderProps {
  selected: boolean;
}

const CardHolder = styled.div<CardHolderProps>`
  user-select: none;
  width: fit-content;
  height: fit-content;
  margin: 40px;
  border-radius: 10px;

  animation: ${uninspect} 0.5s;
  animation-fill-mode: forwards;

  ${(props) =>
    props.selected
      ? css`
          animation: ${inspect} 0.5s;
          animation-fill-mode: forwards;
          z-index: 3;
          ${Card} {
            box-shadow: 20px 50px 0px 30px rgba(0, 0, 0, 0.3) !important;
          }

          ${CardChild} {
            animation: none;
            visibility: visible;
            opacity: 1;
          }
        `
      : css`
          &:hover ${Card} {
            animation: ${flipCard} 0.25s;
            animation-fill-mode: forwards;
          }

          &:hover ${Card} ${CardChild} {
            animation: ${fadeIn} 1.25s;
            animation-fill-mode: forwards;
          }
        `}
`;

const TarotSVG = styled.svg`
  width: 100%;
  height: 100%;
  padding-left: 5px;
`;

const TarotNumeral = styled.text`
  font-size: 60px;
  font-family: monospace;
  stroke: ${WHITE};
  stroke-width: 1;
  fill: ${WHITE};
`;

const BeethovenHolder = styled.div`
  position: absolute;
  bottom: -2%;
  right: -2%;
`;

interface CardItemProps {
  key: string;
  numeral: string;
  text: string;
  flipped?: boolean;
}

const CardItem = ({ numeral, text, flipped }: CardItemProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (event: { button: number }) => {
    if (event.button === 0) {
      setSelected(!selected);
    }
  };

  return (
    <CardHolder selected={selected} onMouseDown={handleClick}>
      <Card>
        <CardChild flipped={flipped}>
          <CardContent>{text}</CardContent>
          <TarotSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
            <TarotNumeral x="0" y="-20%" textAnchor="start">
              {numeral}
            </TarotNumeral>
          </TarotSVG>
          <BeethovenHolder>
            <Beethoven />
          </BeethovenHolder>
        </CardChild>
      </Card>
    </CardHolder>
  );
};

export default CardItem;
