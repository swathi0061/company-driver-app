
import React, { useState } from 'react';
import CompanyForm from '../components/Company/CompanyForm';
import CompanyTable from '../components/Company/CompanyTable';

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState('entry');

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">Company Details</h2>

      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'entry' ? 'border-b-4 border-teal-600 text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('entry')}
        >
          User Entry
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'display' ? 'border-b-4 border-teal-600 text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('display')}
        >
          User Display
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'entry' ? <CompanyForm /> : <CompanyTable />}
      </div>
    </div>
  );
};

export default CompanyPage;