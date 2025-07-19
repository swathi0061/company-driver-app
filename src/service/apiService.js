// src/service/apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // adjust to your backend URL

// Company APIs
export const saveCompany = (companyData) => axios.post(`${BASE_URL}/companies`, companyData);
export const getCompanies = () => axios.get(`${BASE_URL}/companies`);
export const updateCompany = (id, companyData) => axios.put(`${BASE_URL}/companies/${id}`, companyData);
export const deleteCompany = (id) => axios.delete(`${BASE_URL}/companies/${id}`);

// Driver APIs
export const saveDriver = (driverData) => axios.post(`${BASE_URL}/drivers`, driverData);
export const getDrivers = () => axios.get(`${BASE_URL}/drivers`);
export const updateDriver = (id, driverData) => axios.put(`${BASE_URL}/drivers/${id}`, driverData);
export const deleteDriver = (id) => axios.delete(`${BASE_URL}/drivers/${id}`);
