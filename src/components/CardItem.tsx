import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { BLACK, OFFWHITE, WHITE, Y_ROTATION } from "../utils/constants";

const inspect = keyframes`
  0%   {
    transform: rotateZ(0deg) translateZ(0px);
    z-index: 1;
  }
  100% {
    transform: rotateZ(-30deg) translateZ(600px);
    z-index: 2; 
  }
`;

const uninspect = keyframes`
  0%   {
    transform: rotateZ(-30deg) translateZ(600px);
    z-index: 2;
  }
  100% {
    transform: rotateZ(0deg) translateZ(0px);
    z-index: 1; 
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
    filter: drop-shadow(-25px 25px 20px #000);
    background-color: ${OFFWHITE};}
  100%  {    
    transform: rotateY(${Y_ROTATION});
    filter: drop-shadow(25px 25px 20px #000);
    background-color: ${BLACK} ;}
`;

const unflipCard = keyframes`
  0%  {    
  transform: rotateY(180deg);
  filter: drop-shadow(-25px 25px 20px #000);
  background-color: ${BLACK} ;}
  100%   {    
    transform: rotateY(${Y_ROTATION});
    filter: drop-shadow(25px 25px 20px #000);
    background-color: ${OFFWHITE};}
`;

const Card = styled.div`
  transform: translateZ(10px);
  filter: drop-shadow(25px 25px 20px #000);
  width: 100px;
  height: 200px;
  border-radius: 10px;
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

const CardChild = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;

  background-color: ${BLACK};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const CardContent = styled.pre`
  box-sizing: border-box;
  color: ${WHITE};
  width: 100%;
  padding: 5px;
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
  z-index: 1;

  animation: ${uninspect} 0.5s;
  animation-fill-mode: forwards;

  ${(props) =>
    props.selected
      ? css`
          animation: ${inspect} 0.5s;
          animation-fill-mode: forwards;

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

const CardSVG = styled.svg`
  position: absolute;
  top: 50px;
  width: 100%;
  height: 100%;
`;

const CardNumeral = styled.text`
  font-size: 100px;
  font-family: monospace;
  stroke: ${WHITE};
  stroke-width: 1;
  fill: none;
`;

interface CardItemProps {
  key: string;
  numeral: string;
  text: string;
}

const CardItem = ({ numeral, text }: CardItemProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (event: { button: number }) => {
    if (event.button === 0) {
      setSelected(!selected);
    }
  };

  return (
    <CardHolder selected={selected} onMouseDown={handleClick}>
      <Card>
        <CardChild>
          <CardContent>{text}</CardContent>
          <CardSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
            <CardNumeral
              x="70%"
              y="60%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {numeral}
            </CardNumeral>
          </CardSVG>
          <CardSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
            <CardNumeral
              x="75%"
              y="65%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {numeral}
            </CardNumeral>
          </CardSVG>
        </CardChild>
      </Card>
    </CardHolder>
  );
};

export default CardItem;
