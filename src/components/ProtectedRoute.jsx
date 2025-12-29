import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // check login state

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // redirect to login if not logged in
  }
  return children;
}
