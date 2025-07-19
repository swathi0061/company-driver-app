import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockCompanyData = [
  {
    id: 1,
    name: 'ABC Pvt Ltd',
    website: 'www.abc.com',
    establishedOn: '2020-01-01',
    registrationNumber: 'ABC12345',
    address1: 'Street 1, Block A',
    address2: 'Street 2, Block A',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '500001',
    contactFirstName: 'John',
    contactLastName: 'Cena',
    contactMail: 'john@gmail.com',
    contactMobile: '9876543210',
  },
  {
    id: 2,
    name: 'XYZ Corp',
    website: 'www.xyz.com',
    establishedOn: '2019-05-10',
    registrationNumber: 'XYZ67890',
    address1: 'Road 5, Sector B',
    address2: 'Road 2, Sector A',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '506601',
    contactFirstName: 'David',
    contactLastName: 'Rithik',
    contactMail: 'david@gmail.com',
    contactMobile: '7654321890',
  },
];

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCompanies(mockCompanyData); // replace with API call later
  }, []);

  const handleEdit = (company) => {
  setSelectedCompany({ ...company }); // clone to avoid reactivity
  setIsModalOpen(true); // trigger animation once
};

  const handleChange = (e) => {
    setSelectedCompany({ ...selectedCompany, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
  const updatedList = companies.map((c) =>
    c.id === selectedCompany.id ? selectedCompany : c
  );
  setCompanies(updatedList);
  toast.success('Company details updated successfully!');
  setIsModalOpen(false);
  setSelectedCompany(null);
};


  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

 const ModalWithEffect = ({ show, children }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [show]);

  return (
    <div
      className={`transition-all duration-300 ease-out transform ${
        animate ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}
    >
      {children}
    </div>
  );
};


  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Website</th>
              <th className="p-2 border">Reg No</th>
              <th className="p-2 border">Address1</th>
              <th className="p-2 border">Address2</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">Zip Code</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Mail ID</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((company) => (
              <tr key={company.id} className="text-center">
                <td className="border p-2">{company.name}</td>
                <td className="border p-2">{company.website}</td>
                <td className="border p-2">{company.registrationNumber}</td>
                <td className="border p-2">{company.address1}</td>
                <td className="border p-2">{company.address2}</td>
                <td className="border p-2">{company.city}</td>
                <td className="border p-2">{company.state}</td>
                <td className="border p-2">{company.zipCode}</td>
                <td className="border p-2">{company.contactFirstName}</td>
                <td className="border p-2">{company.contactLastName}</td>
                <td className="border p-2">{company.contactMail}</td>
                <td className="border p-2">{company.contactMobile}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(company)}
                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <ModalWithEffect show={isModalOpen}>
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
        <h3 className="text-xl font-bold mb-4 text-teal-700">Edit Company</h3>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={selectedCompany?.name || ''} onChange={handleChange} className="input" />
          <input name="website" value={selectedCompany?.website || ''} onChange={handleChange} className="input" />
          <input name="registrationNumber" value={selectedCompany?.registrationNumber || ''} onChange={handleChange} className="input" />
          <input name="address1" value={selectedCompany?.address1 || ''} onChange={handleChange} className="input" />
          <input name="address2" value={selectedCompany?.address2 || ''} onChange={handleChange} className="input" />
          <input name="city" value={selectedCompany?.city || ''} onChange={handleChange} className="input" />
          <input name="state" value={selectedCompany?.state || ''} onChange={handleChange} className="input" />
          <input name="zipCode" value={selectedCompany?.zipCode || ''} onChange={handleChange} className="input" />
          <input name="contactFirstName" value={selectedCompany?.contactFirstName || ''} onChange={handleChange} className="input" />
          <input name="contactLastName" value={selectedCompany?.contactLastName || ''} onChange={handleChange} className="input" />
          <input name="contactMail" value={selectedCompany?.contactMail || ''} onChange={handleChange} className="input" />
          <input name="contactMobile" value={selectedCompany?.contactMobile || ''} onChange={handleChange} className="input" />
          <input type="date" name="establishedOn" value={selectedCompany?.establishedOn || ''} onChange={handleChange} className="input" />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => { setIsModalOpen(false); setSelectedCompany(null); }} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Save</button>
        </div>
      </div>
    </ModalWithEffect>
  </div>
)}


<ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default CompanyTable;
