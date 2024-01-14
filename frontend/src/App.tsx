import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { v4 as uuid } from "uuid";
import NotFoundPage from "./Pages/NotFounds";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={`/docs/${uuid()}`} />}
          />
          <Route path="/docs/:id" element={<Editor />} />
          <Route path="/docs" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
