import React from "react";
import styled from "styled-components";
import { Position } from "./types";
import { poolDimension, translate } from "./poolDimension";

type TableProps = {
  cueBall: Position;
  objectBall: Position;
};

function Table({ cueBall, objectBall }: TableProps): React.ReactElement {
  return (
    <PoolBase>
      <Pool src="/pool.svg" />
      <Ball $x={cueBall.x} $y={cueBall.y} src="/cue-ball.svg" />
      <Ball $x={objectBall.x} $y={objectBall.y} src="/object-ball.svg" />
    </PoolBase>
  );
}

export default Table;

const Pool = styled.img`
  width: ${poolDimension.width}px;
  height: auto;
`;

const PoolBase = styled.div`
  position: relative;
`;

const Ball = styled.img<{ $x: number; $y: number }>`
  position: absolute;
  width: ${poolDimension.ballDiameter}px;
  height: auto;
  top: ${(props) => translate(props.$y)}px;
  left: ${(props) => translate(props.$x)}px;
`;
