import React, { useEffect, useMemo, useState } from "react";
import Table from "./Pool";
import styled from "styled-components";
import { poolDimension } from "./poolDimension";
import Control, { controlWidth } from "./Control";
import { generateAll } from "./drills";
import { load } from "./storage";

function App(): React.ReactElement {
  const exs = useMemo(generateAll, []);
  const [idx, setIdx] = useState(0);
  const { cue, object } = exs[idx];
  const exerciseData = load();
  useEffect(() => {
    const n = Math.floor(Math.random() * exs.length);
    setIdx(n);
  }, [exs.length]);
  return (
    <>
      <Field>
        <Table cueBall={cue} objectBall={object} />
        <Control
          cueBall={cue}
          objectBall={object}
          exerciseData={exerciseData}
          exIndex={idx}
        />
      </Field>
      <div>
        <button
          onClick={() => {
            const n = Math.floor(Math.random() * exs.length);
            setIdx(n);
          }}
        >
          next
        </button>
      </div>
    </>
  );
}

export default App;

const Field = styled.div`
  display: flex;
  calc(${poolDimension.width + controlWidth}px + var(--basic-gap));
`;
