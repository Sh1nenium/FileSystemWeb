import { toast } from "react-toastify";
import { Session } from "./types";
import { useAuth } from "@/shared/utils/auth";

export function useSessionRepository() {
  const { setIsAuthenticated } = useAuth();
    
  const saveSession = (value: Session) => {
    toast.success("Вы успешно авторизовались!")
    localStorage.setItem('session', JSON.stringify(value));
    setIsAuthenticated(true);
  }

  const getSession = (): Session | null => 
    localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!) : null;
  
  const removeSession = () => {
    localStorage.removeItem('session')
    toast.success("Вы успешно вышли!")
    setIsAuthenticated(false)
  };

  return { saveSession, getSession, removeSession };
}