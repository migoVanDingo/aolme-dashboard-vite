import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../deprecated/context/AuthContext";

export default function PublicRoute({ children }: any) {
  const { currentUser } = useAuth();

  

  return !currentUser ? children : <Navigate to="/profile" />;
}
