import React, { Suspense } from "react";
import Body from "./Body";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./Results";

function App(): React.ReactElement {
  return (
    <>
      <BrowserRouter basename="/bdrill">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
