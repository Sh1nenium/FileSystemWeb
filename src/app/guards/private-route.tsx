import { ROUTES } from '@/shared/constants/routes';
import { useAuth } from '@/shared/utils/auth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) { 
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;