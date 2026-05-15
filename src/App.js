import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ComplaintPage from "./pages/ComplaintPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route path="/complaint" element={<ComplaintPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;