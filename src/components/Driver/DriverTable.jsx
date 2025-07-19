import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockDriverData = [
  {
    id: 1,
    name: 'Ravi Kumar',
    licenseNumber: 'DL1234567',
    contactNumber: '9876543210',
    joiningDate: '2022-03-01',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600001',
    address: 'Street 1, Area A',
  },
  {
    id: 2,
    name: 'Suresh Babu',
    licenseNumber: 'MH7654321',
    contactNumber: '9012345678',
    joiningDate: '2021-11-20',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    address: 'Road 3, Block B',
  },
  // add more drivers if needed
];

const ITEMS_PER_PAGE = 5;

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setDrivers(mockDriverData); // replace with API later
  }, []);

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
  };

  const handleChange = (e) => {
    setSelectedDriver({ ...selectedDriver, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updated = drivers.map((d) =>
      d.id === selectedDriver.id ? selectedDriver : d
    );
    setDrivers(updated);
    toast.success('Driver details updated successfully!');
    setSelectedDriver(null);
  };

  const filtered = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDrivers = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex mb-4 justify-between">
        <input
          type="text"
          placeholder="Search Driver..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          className="input w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">License</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDrivers.map((driver) => (
              <tr key={driver.id} className="text-center">
                <td className="border p-2">{driver.name}</td>
                <td className="border p-2">{driver.licenseNumber}</td>
                <td className="border p-2">{driver.contactNumber}</td>
                <td className="border p-2">{driver.city}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(driver)}
                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {paginatedDrivers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">No drivers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
            <h3 className="text-xl font-bold mb-4 text-teal-700">Edit Driver</h3>

            <div className="grid grid-cols-2 gap-4">
              <input name="name" value={selectedDriver.name} onChange={handleChange} className="input" />
              <input name="licenseNumber" value={selectedDriver.licenseNumber} onChange={handleChange} className="input" />
              <input name="contactNumber" value={selectedDriver.contactNumber} onChange={handleChange} className="input" />
              <input type="date" name="joiningDate" value={selectedDriver.joiningDate} onChange={handleChange} className="input" />
              <input name="city" value={selectedDriver.city} onChange={handleChange} className="input" />
              <input name="state" value={selectedDriver.state} onChange={handleChange} className="input" />
              <input name="zipCode" value={selectedDriver.zipCode} onChange={handleChange} className="input" />
              <input name="address" value={selectedDriver.address} onChange={handleChange} className="input" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setSelectedDriver(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DriverTable;
