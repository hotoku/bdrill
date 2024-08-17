import React from "react";
import Table from "./Pool";

function App(): React.ReactElement {
  return <Table cueBall={{ x: 1, y: 2 }} objectBall={{ x: 2, y: 4 }} />;
}

export default App;
