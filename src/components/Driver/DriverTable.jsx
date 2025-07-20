import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2 } from 'lucide-react';
import { getDriver, updateDriver, deleteDriver } from '../../service/apiService';



const fieldPlaceholders = {
  
    driverFirstName: 'Driver First Name',
    driverLastName: 'Driver Last Name',
    driverEmail:'Driver Mail',
    driverContactNumber: 'Driver Mobile',
    dob:'DOB',
    licenseNumber: 'License No',
    experience:'Exp',
    address1: 'Address Line 1',
    address2: 'Address Line 2',
    city: 'City',
    state: 'State',
    zipCode: 'Zipcode',
};

const ITEMS_PER_PAGE = 2;

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

 useEffect(() => {
  fetchDrivers();
}, []);

const fetchDrivers = async () => {
  try {
    const res = await getDriver(); 
    setDrivers(res.data.content || []); 
  } catch (err) {
    toast.error('Failed to load drivers');
  }
};


  const handleEdit = (driver) => {
    setSelectedDriver(driver);
  };

  const handleChange = (e) => {
    setSelectedDriver({ ...selectedDriver, [e.target.name]: e.target.value });
  };

 const handleUpdate = async () => {
  try {
    await updateDriver(selectedDriver); // call backend
    toast.success('Driver updated!');
    fetchDrivers(); // reload from backend
    setSelectedDriver(null);
  } catch (err) {
    toast.error('Failed to update driver');
  }
};

const handleDelete = async (id) => {
  try {
    await deleteDriver(id); // call backend
    toast.success('Driver deleted!');
    fetchDrivers(); // reload after deletion
  } catch (err) {
    toast.error('Failed to delete driver');
  }
};


  const filtered = drivers.filter((d) =>
  `${d.driverFirstName} ${d.driverLastName}`.toLowerCase().includes(search.toLowerCase())
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
              <th className="p-2 border text-nowrap">Driver First Name</th>
              <th className="p-2 border text-nowrap">Driver Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border text-nowrap">License No</th>
              <th className="p-2 border">Exp</th>
              <th className="p-2 border">Address1</th>
              <th className="p-2 border">Address2</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">ZipCode</th>
              <th className="p-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDrivers.map((driver) => (
              <tr key={driver.id} className="text-center">
                <td className="border p-2">{driver.driverFirstName}</td>
                <td className="border p-2">{driver.driverLastName}</td>
                <td className="border p-2">{driver.driverEmail}</td>
                <td className="border p-2">{driver.driverContactNumber}</td>
                <td className="border p-2">{driver.dob}</td>
                <td className="border p-2">{driver.licenseNumber}</td>
                <td className="border p-2">{driver.experience}</td>
                <td className="border p-2">{driver.address1}</td>
                <td className="border p-2">{driver.address2}</td>
                <td className="border p-2">{driver.city}</td>
                <td className="border p-2">{driver.state}</td>
                <td className="border p-2">{driver.zipCode}</td>
                <td className="border p-2 flex gap-3 justify-center">
  <Edit onClick={() => handleEdit(driver)} className="w-5 h-12 text-teal-600 cursor-pointer" />
  <Trash2 onClick={() => handleDelete(driver.id)} className="w-5 h-12 text-red-600 cursor-pointer" />
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
              

             
  {Object.keys(fieldPlaceholders).map((field) => (
    <input
      key={field}
      name={field}
      value={selectedDriver?.[field] || ''}
      onChange={handleChange}
      className="input"
      placeholder={fieldPlaceholders[field]}
    />
  ))}
  <input
    type="date"
    name="dob"
    value={selectedDriver?.dob || ''}
    onChange={handleChange}
    className="input"
  />
</div>


            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setSelectedDriver(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default DriverTable;
