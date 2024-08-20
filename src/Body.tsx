import React, { useCallback, useEffect, useState } from "react";
import Table from "./Pool";
import styled from "styled-components";
import { poolDimension } from "./poolDimension";
import Control, { controlWidth } from "./Control";
import { load } from "./storage";
import useExercises from "./useExercise";

function Body(): React.ReactElement {
  const exs = useExercises();
  const [idx, setIdx] = useState(0);
  const { cue, object } = exs[idx];
  const exerciseData = load();
  const upadte = useCallback(() => {
    const n = Math.floor(Math.random() * exs.length);
    setIdx(n);
  }, [exs.length, setIdx]);

  useEffect(() => {
    upadte();
  }, [upadte]);

  return (
    <>
      <Field>
        <Table cueBall={cue} objectBall={object} />
        <Control
          cueBall={cue}
          objectBall={object}
          exIndex={idx}
          update={upadte}
        />
      </Field>
    </>
  );
}

export default Body;

const Field = styled.div`
  display: flex;
  calc(${poolDimension.width + controlWidth}px + var(--basic-gap));
`;
