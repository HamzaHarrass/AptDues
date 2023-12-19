// AuthRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; 

const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false; // No token found, user is not authenticated
  }

  try {
    // Decode the JWT token
    const decodedToken = jwt_decode(token);

    // Perform additional checks, e.g., check expiration, roles, etc.
    const isTokenValid = /* Your additional checks based on the decoded token */ true;

    return isTokenValid;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; // If there's an error decoding the token, consider the user not authenticated
  }
};

const AuthRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Route element={element} />
  ) : (
    <Navigate to="/auth" />
  );
};

export default AuthRoute;
