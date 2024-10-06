import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // to get access to the auth context

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // redirect to login page if user is not authenticated
  }

  return children; // render the children component if user is authenticated
};

export default ProtectedRoute;
