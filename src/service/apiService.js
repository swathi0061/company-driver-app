import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Company APIs

export const saveCompany = (companyData) =>
  axios.post(`${BASE_URL}/companies/insert_company`, companyData);

export const updateCompany = (companyData) =>
  axios.put(`${BASE_URL}/companies/update_company`, companyData);

export const getCompanyById = (id) =>
  axios.get(`${BASE_URL}/companies/get_company`, {
    params: { id },
  });

export const getCompany = () =>
  axios.get(`${BASE_URL}/companies`);

export const deleteCompany = (id) =>
  axios.delete(`${BASE_URL}/companies/delete_company`, {
    params: { id },
  });


// Driver APIs 
export const saveDriver = (driverData) =>
  axios.post(`${BASE_URL}/drivers/insert_driver`, driverData);

export const updateDriver = (driverData) =>
  axios.put(`${BASE_URL}/drivers/update_driver`, driverData);

export const getDriverById = (id) =>
  axios.get(`${BASE_URL}/drivers/get_driver`, {
    params: { id },
  });

export const deleteDriver = (id) =>
  axios.delete(`${BASE_URL}/drivers/delete_driver`, {
    params: { id },
  });

  export const getDriver = () =>
  axios.get(`${BASE_URL}/drivers`);
