import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    contactNumber: '',
    joiningDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate save
    toast.success('Driver details inserted successfully!');

    // Reset form
    setFormData({
      name: '',
      licenseNumber: '',
      contactNumber: '',
      joiningDate: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Driver Name" className="input" />
      <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="License Number" className="input" />
      <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="input" />
      <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="input" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="input" />
      <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" className="input" />

      <button type="submit" className="col-span-1 md:col-span-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition">Save</button>

      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default DriverForm;
