import useAuth from 'hooks/use-auth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ component: Component }) {
  const location = useLocation();
  const isAuth = useAuth();

  if (!isAuth) return <Navigate to="/signin" state={{ from: location }} />;

  return Component;
}

export default RequireAuth;
