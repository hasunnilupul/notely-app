import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, handleAuthentication } = useContext(AuthContext); // to get access to the auth context
  const [isLoading, setIsLoading] = useState(true); // to show a loading spinner while checking for authentication

  const checkAuth = async () => {
    setIsLoading((prevState) => true);
    if (!isAuthenticated) {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        await handleAuthentication(token);
      }
    }
    setIsLoading((prevState) => false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <ImSpinner3 className="animate-spin text-4xl text-slate-400" />
      </div>
    ); // show a loading spinner while checking for authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // redirect to login page if user is not authenticated
  }

  return children; // render the children component if user is authenticated
};

export default ProtectedRoute;
