import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" or "user"
  const location = useLocation();

  // ✅ If not logged in, always redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If a role is required (e.g. admin dashboard), check it
  if (requiredRole && role !== requiredRole) {
    // Redirect users with wrong role back to their dashboard
    const fallback = role === "admin" ? "/admin-dashboard" : "/user-dashboard";
    return <Navigate to={fallback} replace state={{ from: location }} />;
  }

  return children;
}
