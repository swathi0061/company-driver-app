import React, { useState } from 'react';

const CompanyTable = ({ companies }) => {
  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search Company"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>City</th><th>Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.city}</td>
              <td>{company.contactFirstName}</td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
