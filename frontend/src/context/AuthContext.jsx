import { createContext, useState, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // is authenticated or not state
  const [authenticatedUser, setAuthenticatedUser] = useState(null); // authenticated user state

  // fetch user data from the API
  const fetchUserData = async () => {
    const response = await axiosInstance.get("/auth/user");
    if (response.data && response.data.user) {
      setIsAuthenticated((prevState) => true);
      setAuthenticatedUser((prevState) => response.data.user);
    }
  };

  // save user data to local storage
  const handleAuthentication = async (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      await fetchUserData();
    }
  };

  // save user data to local storage
  const clearUserData = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsAuthenticated((prevState) => false);
    setAuthenticatedUser((prevState) => null);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      authenticatedUser,
      handleAuthentication,
      clearUserData,
    }),
    [isAuthenticated, authenticatedUser]
  ); // memoizing the context value to avoid unnecessary re-renders

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
