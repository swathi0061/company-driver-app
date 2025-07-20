import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2 } from 'lucide-react';
import { getCompany, updateCompany, deleteCompany } from '../../service/apiService';



const fieldPlaceholders = {
  name: 'Company Name',
  website: 'Website',
  registrationNumber: 'Registration Number',
  address1: 'Address Line 1',
  address2: 'Address Line 2',
  city: 'City',
  state: 'State',
  zipCode: 'Zip Code',
  contactFirstName: 'Contact First Name',
  contactLastName: 'Contact Last Name',
  contactMail: 'Contact Email',
  contactMobile: 'Contact Mobile',
};

const CompanyTable = () => {
    const [companies, setCompanies] = useState([]);
   const [search, setSearch] = useState('');

  useEffect(() => {
  setCurrentPage(1); // reset to page 1 when searching
}, [search]);

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 2;

const filtered = companies.filter((c) =>
  c.name.toLowerCase().includes(search.toLowerCase())
);

const totalPages = Math.ceil(filtered.length / itemsPerPage);

// Get current page data
const paginatedCompanies = filtered.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


 
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompany();
      setCompanies(response.data.content || []);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
      toast.error('Error fetching company data');
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany({ ...company });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prev) => ({ ...prev, [name]: value }));
  };

const handleUpdate = async () => {
  try {
    await updateCompany(selectedCompany);
    toast.success('Company details updated!');
    await fetchCompanies(); // 🔁 make sure to `await` this
    setIsModalOpen(false);
    setSelectedCompany(null);
  } catch (err) {
    toast.error('Failed to update company');
  }
};


 const handleDelete = async (id) => {
  try {
    await deleteCompany(id);
    toast.success('Company deleted!');
    await fetchCompanies(); // 🔁 refresh UI
  } catch (err) {
    toast.error('Failed to delete company');
  }
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
              <th className="p-2 border text-nowrap">Zip Code</th>
              <th className="p-2 border text-nowrap">First Name</th>
              <th className="p-2 border text-nowrap">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map((company) => (


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
                <td className="border px-2 py-1">
                  <div className="flex items-center justify-center gap-3">
                    <Edit
                      onClick={() => handleEdit(company)}
                      className="w-5 h-5 text-teal-600 cursor-pointer hover:text-teal-800 transition"
                    />
                    <Trash2
                      onClick={() => handleDelete(company.id)}
                      className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800 transition"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Simple Modal - no animation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
            <h3 className="text-xl font-bold mb-4 text-teal-700">Edit Company</h3>

            <div className="grid grid-cols-2 gap-4">
  {Object.keys(fieldPlaceholders).map((field) => (
    <input
      key={field}
      name={field}
      value={selectedCompany?.[field] || ''}
      onChange={handleChange}
      className="input"
      placeholder={fieldPlaceholders[field]}
    />
  ))}

  <input
    type="date"
    name="establishedOn"
    value={selectedCompany?.establishedOn || ''}
    onChange={handleChange}
    className="input"
    placeholder="Established On"
  />
</div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCompany(null);
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1000} />
      {totalPages > 1 && (
  <div className="flex justify-center mt-4 gap-2">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-1 rounded border ${
          currentPage === page ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'
        }`}
      >
        {page}
      </button>
    ))}
  </div>
)}


    </div>
  );
};

export default CompanyTable;
