import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedPage({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/sign-in" replace />;
  }

  return children ? children : <Outlet />;
}
