import React, { Suspense } from "react";
import Body from "./Body";
import Header from "./Header";

function App(): React.ReactElement {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Body />
      </Suspense>
    </>
  );
}

export default App;
