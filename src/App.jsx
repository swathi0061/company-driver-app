import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import CompanyPage from './pages/CompanyPage';
import DriverPage from './pages/DriverPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

 const handleLogin = (username, password) => {
  if (username === 'company' && password === 'pass') {
    setIsAuthenticated(true);
    setRole('company');
    return true;
  } else if (username === 'driver' && password === 'pass') {
    setIsAuthenticated(true);
    setRole('driver');
    return true;
  } else {
    return false; // for toast
  }
};

  return (
    <div className="min-h-screen bg-teal-900 text-white p-4">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}`} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/company"
          element={
            isAuthenticated && role === 'company' ? (
              <CompanyPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/driver"
          element={
            isAuthenticated && role === 'driver' ? (
              <DriverPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
