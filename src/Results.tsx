import React from "react";
import styled from "styled-components";

function Results(): React.ReactElement {
  const [results, setResults] = React.useState([]);
  return <Main>Results</Main>;
}

export default Results;

const Main = styled.div`
  margin: var(--small-gap);
  padding: var(--small-gap);
`;
