import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ component: Component }) {
    const location = useLocation();
    const { profile, token } = useSelector((state) => state.user);
    const authenticated = profile && token;

    if (!authenticated) return <Navigate to="/signin" state={{ from: location }} />;

    return <Component />;
}

export default RequireAuth;
