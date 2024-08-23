import React, { useCallback, useEffect, useState } from "react";
import Table from "./Pool";
import styled from "styled-components";
import { poolDimension } from "./poolDimension";
import Control, { controlWidth } from "./Control";
import useExercises from "./useExercise";

function Body(): React.ReactElement {
  const exs = useExercises();
  const [idx, setIdx] = useState(0);
  const { cue, object } = exs[idx];
  const update = useCallback(() => {
    const n = Math.floor(Math.random() * exs.length);
    setIdx(n);
  }, [exs.length, setIdx]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <>
      <Field>
        <Table cueBall={cue} objectBall={object} />
        <Control
          exerciseId={idx}
          cueBall={cue}
          objectBall={object}
          exIndex={idx}
          update={update}
        />
      </Field>
    </>
  );
}

export default Body;

const Field = styled.div`
  display: flex;
  margin: var(--small-gap);
  padding: var(--small-gap);
  width: calc(${poolDimension.width + controlWidth}px + var(--basic-gap));
`;
