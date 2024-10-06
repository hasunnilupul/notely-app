import React, { useContext, useEffect } from "react";

import AuthContext, { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};

export default App;
