import React, { Suspense } from "react";
import Body from "./Body";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./Results";
import config from "./config";
import Settings from "./Settings";

function App(): React.ReactElement {
  return (
    <>
      <BrowserRouter basename={config.basenamee}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/results" element={<Results />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
