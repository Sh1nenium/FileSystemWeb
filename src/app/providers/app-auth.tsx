import { useSessionRepository } from "@/entities/session";
import { AuthContext } from "@/shared/contexts/auth-context";
import { useStateObject } from "@/shared/utils/state-object";
import React from "react";

const AuthProvider = ({ children } : { children?: React.ReactNode }) => {
  const { getSession } = useSessionRepository();
  const session = getSession();

  const { value: isAuthenticated, setValue: setIsAuthenticated } = useStateObject(
    Boolean(session)
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };