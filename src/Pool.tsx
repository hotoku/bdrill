import React from "react";
import styled from "styled-components";
import { Position } from "./types";
import { poolDimension, translateX, translateY } from "./poolDimension";

type TableProps = {
  cueBall: Position;
  objectBall: Position;
};

function Table({ cueBall, objectBall }: TableProps): React.ReactElement {
  return (
    <PoolBase>
      <Pool src="/bdrill/pool.svg" />
      <Ball $x={cueBall.x} $y={cueBall.y} src="/bdrill/cue-ball.svg" />
      <Ball $x={objectBall.x} $y={objectBall.y} src="/bdrill/object-ball.svg" />
    </PoolBase>
  );
}

export default Table;

const Pool = styled.img`
  width: ${poolDimension.width}px;
  height: ${poolDimension.height}px;
`;

const PoolBase = styled.div`
  position: relative;
`;

const Ball = styled.img<{ $x: number; $y: number }>`
  position: absolute;
  width: ${poolDimension.ballDiameter}px;
  height: ${poolDimension.ballDiameter}px;
  top: ${(props) => translateY(props.$y)}px;
  left: ${(props) => translateX(props.$x)}px;
`;
