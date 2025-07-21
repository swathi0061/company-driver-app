import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveDriver } from '../../service/apiService';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    driverFirstName: '',
    driverLastName: '',
    driverEmail:'',
    driverContactNumber: '',
    dob:'',
    licenseNumber: '',
    experience:'',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'driverContactNumber') {
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
      'driverFirstName',
      'driverContactNumber',
      'licenseNumber',
      'experience',
      'address1',
      'city',
      'state',
      'zipCode',
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
  
    if (missingFields.length > 0) {
      toast.error('Please fill all required fields');
      return;
    }
  
      try {
        const response = await saveDriver(formData); 
        if (response.status === 200 && response.data === 'Inserted Successfully') {
          toast.success('' + response.data);

    setFormData({
    driverFirstName: '',
    driverLastName: '',
    driverEmail:'',
    driverContactNumber: '',
    dob:'',
    licenseNumber: '',
    experience:'',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
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
      <input name="driverFirstName" value={formData.driverFirstName} onChange={handleChange} placeholder="Driver First Name *" className="input" />
       <input name="driverLastName" value={formData.driverLastName} onChange={handleChange} placeholder="Driver Last Name" className="input" />
       <input name="driverEmail" value={formData.driverEmail} onChange={handleChange} placeholder="Contact Mail" className="input" />
       <input name="driverContactNumber" value={formData.driverContactNumber} onChange={handleChange} placeholder="Contact Mobile *" className="input" />
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" />
       <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="License Number *" className="input" />
       <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience *" className="input" />
      <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address1 *" className="input" />
      <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address2" className="input" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City *" className="input" />
      <input name="state" value={formData.state} onChange={handleChange} placeholder="State *" className="input" />
      <input name="zipCode" value={formData.zipCode} type="number" maxLength={6} onChange={handleChange}  placeholder="Zip Code *" className="input" />

      
      <div className="w-full md:col-span-2 flex justify-end">
        <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition w-[20%] min-w-[100px]">
          Save
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />
    </form>
  );
};

export default DriverForm;
