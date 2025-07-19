import React, { useState } from 'react';


const CompanyForm = ({ fetchData }) => {
  const [form, setForm] = useState({
    name: '', establishedOn: '', regNumber: '', website: '',
    address1: '', address2: '', city: '', state: '', zip: '',
    contactFirstName: '', contactLastName: '', contactEmail: '', contactMobile: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveCompany(form);
    fetchData();
    setForm({
      name: '', establishedOn: '', regNumber: '', website: '',
      address1: '', address2: '', city: '', state: '', zip: '',
      contactFirstName: '', contactLastName: '', contactEmail: '', contactMobile: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} />
      <input name="establishedOn" type="date" value={form.establishedOn} onChange={handleChange} />
      <input name="regNumber" placeholder="Registration #" value={form.regNumber} onChange={handleChange} />
      <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
      <input name="address1" placeholder="Address 1" value={form.address1} onChange={handleChange} />
      <input name="address2" placeholder="Address 2" value={form.address2} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
      <input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
      <input name="contactFirstName" placeholder="Contact First Name" value={form.contactFirstName} onChange={handleChange} />
      <input name="contactLastName" placeholder="Contact Last Name" value={form.contactLastName} onChange={handleChange} />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} />
      <input name="contactMobile" placeholder="Contact Mobile" value={form.contactMobile} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default CompanyForm;
