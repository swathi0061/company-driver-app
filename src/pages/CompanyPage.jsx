import React, { useState, useEffect } from 'react';
import CompanyForm from '../components/Company/CompanyForm';
import CompanyTable from '../components/Company/CompanyTable';
import { getCompanies } from '../service/apiService';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="page">
      <h2>Company Management</h2>
      <CompanyForm fetchData={fetchCompanies} />
      <CompanyTable companies={companies} />
    </div>
  );
};

export default CompanyPage;
