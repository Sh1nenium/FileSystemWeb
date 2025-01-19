import { useSessionRepository } from "@/entities/session";
import { AuthContext } from "@/shared/contexts/auth-context";
import { useStateObject } from "@/shared/utils/state-object";
import React from "react";
import { ToastContainer } from "react-toastify";

const AuthProvider = ({ children } : { children?: React.ReactNode }) => {
  const { getSession } = useSessionRepository();
  const session = getSession();

  const { value: isAuthenticated, setValue: setIsAuthenticated } = useStateObject(
    Boolean(session)
  );

  return (
    
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };