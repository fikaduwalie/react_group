import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute ensures that only authenticated users can access wrapped components.
 * If the user is not logged in, they are redirected to /login and the original location
 * is saved in state so we can navigate back after a successful login.
 */
export default function ProtectedRoute({ children }) {
  const user = useAuthStore(state => state.user);
  const location = useLocation();

  if (!user) {
    // Redirect to login, preserving the intended destination
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
