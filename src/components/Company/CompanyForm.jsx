import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    establishedOn: '',
    registrationNumber: '',
    website: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    contactFirstName: '',
    contactLastName: '',
    contactMail: '',
    contactMobile: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock inserting logic for now
    toast.success('Company details inserted successfully!');
    setFormData({
    name: '',
    establishedOn: '',
    registrationNumber: '',
    website: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    contactFirstName: '',
    contactLastName: '',
    contactMail: '',
    contactMobile: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" className="input" />
      <input type="date" name="establishedOn" value={formData.establishedOn} onChange={handleChange} placeholder="Company Established On" className="input" />
      <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Company Registration Number" className="input" />
      <input name="website" value={formData.website} onChange={handleChange} placeholder="Company Website" className="input" />
      <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Company Address1" className="input" />
      <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Company Address2" className="input" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="Company State" className="input" />
      <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" className="input" />
      <input name="contactFirstName" value={formData.contactFirstName} onChange={handleChange} placeholder="Primary Contact First Name" className="input" />
      <input name="contactLastName" value={formData.contactLastName} onChange={handleChange} placeholder="Primary Contact Last Name" className="input" />
      <input name="contactMail" value={formData.contactMail} onChange={handleChange} placeholder="Primary Contact Mail" className="input" />
      <input name="contactMobile" value={formData.contactMobile} onChange={handleChange} placeholder="Primary Contact Mobile" className="input" />
      <button type="submit" className="col-span-1 md:col-span-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition">Save</button>

      <ToastContainer position="top-right" autoClose={2000} />
    </form>
  );
};

export default CompanyForm;
