import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    // Use useEffect to perform side effects, such as navigation
    if (!isAuthenticated) {
      // Navigate to the login page if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated, navigate]); // Ensure navigate is included as a dependency

  // Render children only if authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
