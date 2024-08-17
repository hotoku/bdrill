import React from "react";
import styled from "styled-components";
import { Position } from "./types";

type ControlProps = {
  cueBall: Position;
  objectBall: Position;
};

function Control({ cueBall, objectBall }: ControlProps): React.ReactElement {
  return (
    <Body>
      <BallInfo className="info">
        <BallName>手玉</BallName>
        x={cueBall.x}
        <br />
        y={cueBall.y}
      </BallInfo>
      <BallInfo className="info">
        <BallName>的玉</BallName>
        x={objectBall.x}
        <br />
        y={objectBall.y}
      </BallInfo>
    </Body>
  );
}

export default Control;
export const controlWidth = 100;

const Body = styled.div`
  background-color: #f0f0f0;
  width: ${controlWidth}px;

  margin-left: var(--basic-gap);
  padding: calc(var(--basic-gap) / 2);

  .info + .info {
    margin-top: calc(var(--basic-gap) * 3);
  }
`;

const BallInfo = styled.div``;
const BallName = styled.div``;
