import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CompanyPage from './pages/CompanyPage';


const App = () => {
  return (
    <>
      <nav className="navbar">
        
        <Link to="/company">Company</Link>
        
      </nav>
      <Routes>
        <Route path="/company" element={<CompanyPage />} />
        
      </Routes>
    </>
  );
};

export default App;
