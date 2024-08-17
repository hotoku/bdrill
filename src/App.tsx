import React from "react";
import Table from "./Pool";
import styled from "styled-components";
import { poolDimension } from "./poolDimension";
import Control, { controlWidth } from "./Control";

function App(): React.ReactElement {
  const cueBall = { x: 3, y: 2 };
  const objectBall = { x: 2, y: 4 };
  return (
    <Field>
      <Table cueBall={cueBall} objectBall={objectBall} />
      <Control cueBall={cueBall} objectBall={objectBall} />
    </Field>
  );
}

export default App;

const Field = styled.div`
  display: flex;
  calc(${poolDimension.width + controlWidth}px + var(--basic-gap));
`;
