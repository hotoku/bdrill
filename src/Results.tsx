import React, { useEffect } from "react";
import styled from "styled-components";

function Empty(): React.ReactElement {
  return <Main>no results</Main>;
}

function Results(): React.ReactElement {
  const [results, setResults] = React.useState([]);
  useEffect(() => {}, []);

  if (results.length === 0) {
    return <Empty />;
  }

  return <Main>Results</Main>;
}

export default Results;

const Main = styled.div`
  margin: var(--small-gap);
  padding: var(--small-gap);
`;
