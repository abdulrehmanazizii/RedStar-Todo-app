import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homePage" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
