import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.signin.isAuthenticated
  );
  console.log("isAuthenticated:", isAuthenticated);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/signin" replace />
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignupPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/signin"
          element={
            !isAuthenticated ? <SigninPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
};

export default App;
