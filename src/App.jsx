import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import CompanyPage from './pages/CompanyPage';
import DriverPage from './pages/DriverPage';

const App = () => {
  return (
    <div className="min-h-screen bg-teal-900 text-white p-4">
      <header className="mb-6">
        <nav className="flex gap-6 text-lg font-semibold">
          <Link to="/company" className="hover:text-teal-300">Company</Link>
          <Link to="/driver" className="hover:text-teal-300">Driver</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="*" element={<Navigate to="/company" />} />
      </Routes>
    </div>
  );
};

export default App;
