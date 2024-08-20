import React, { useState } from "react";
import styled from "styled-components";
import { ExerciseData, Position } from "./types";
import { save } from "./storage";

type ControlProps = {
  cueBall: Position;
  objectBall: Position;
  exIndex: number;
  exerciseData: ExerciseData;
  update: () => void;
};

const shotPerTrial = 5;

function Control({
  cueBall,
  objectBall,
  exIndex,
  exerciseData,
  update,
}: ControlProps): React.ReactElement {
  const [success, setSuccess] = useState(0);
  const handleSave = () => {
    const record = exerciseData[exIndex];
    const newRecord = record
      ? {
          success: record.success + success,
          trial: record.trial + shotPerTrial,
        }
      : {
          success: success,
          trial: shotPerTrial,
        };
    const newData = { ...exerciseData, [exIndex]: newRecord };
    save(newData);
    setSuccess(0);
    update();
  };

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
      <RecordPanel className="info">
        <div>
          <RecordInput
            type="number"
            min={0}
            max={shotPerTrial}
            value={success}
            onChange={(e) => {
              setSuccess(parseInt(e.target.value));
            }}
          />{" "}
          / {shotPerTrial}
        </div>
        <ButtonLine>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ButtonLine>
        <ButtonLine>
          <NextButton onClick={update}>Next</NextButton>
        </ButtonLine>
      </RecordPanel>
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
const RecordPanel = styled.div``;
const RecordInput = styled.input`
  display: inline-block;
  width: 4rem;
`;
const ButtonLine = styled.div`
  margin-top: var(--small-gap);
`;
const SaveButton = styled.button``;
const NextButton = styled.button``;
