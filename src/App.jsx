import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

import { existingLogin } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(existingLogin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Default Page */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/change-password"
          element={
            user ? (
              <ChangePassword />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;