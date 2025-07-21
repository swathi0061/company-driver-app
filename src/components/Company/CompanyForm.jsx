import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveCompany } from '../../service/apiService'; 
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
   const { name, value } = e.target;

  if (name === 'contactMobile') {
    if (!/^\d*$/.test(value)) return; 
    if (value.length > 10) {
    toast.error('Contact number must be 10 digits only');
    return; 
    }
  }
  if(name==='zipCode'){
    if(value.length>6) return;
  }
  
  setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
    'name',
    'establishedOn',
    'registrationNumber',
    'website',
    'address1',
    'city',
    'state',
    'zipCode',
    'contactFirstName',
    'contactMobile',
  ];
  
  const missingFields = requiredFields.filter(field => !formData[field]?.trim());

  if (missingFields.length > 0) {
    toast.error('Please fill all required fields');
    return;
  }

    try {
      console.log("formData", formData)
      const response = await saveCompany(formData); 
      if (response.status === 200 && response.data === 'Inserted Successfully') {
        toast.success('' + response.data);
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
      } else {
        toast.error('Unexpected response: ' + response.data);
      }
    } catch (error) {
      const message = error?.response?.data || 'Something went wrong while inserting';
      toast.error('' + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Company Name *" className="input" />
      <input type="date" name="establishedOn" value={formData.establishedOn} onChange={handleChange} placeholder="Established On *" className="input" />
      <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number *" className="input" />
      <input name="website" value={formData.website} onChange={handleChange} placeholder="Website *" className="input" />
      <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1 *" className="input" />
      <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" className="input" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City *" className="input" />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="State *" className="input" />
      <input name="zipCode" value={formData.zipCode} type="number"  maxLength={6} onChange={handleChange} placeholder="Zip Code *" className="input" />
      <input name="contactFirstName" value={formData.contactFirstName} onChange={handleChange} placeholder="Contact First Name *" className="input" />
      <input name="contactLastName" value={formData.contactLastName} onChange={handleChange} placeholder="Contact Last Name" className="input" />
      <input name="contactMail" value={formData.contactMail} onChange={handleChange} placeholder="Contact Mail" className="input" />
      <input name="contactMobile" value={formData.contactMobile} type="text" maxLength={10} onChange={handleChange} placeholder="Contact Mobile *" className="input" />
        <div></div>

  
  <div className='w-full flex justify-end col-span-1 md:col-span-2'>
    <button
      type="submit"
      className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition w-[20%] min-w-[100px]"
    >
      Save
    </button>
  </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </form>
  );
};

export default CompanyForm;
