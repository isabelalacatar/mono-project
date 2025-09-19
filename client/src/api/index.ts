import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getInvoices = async () => {
  const response = await API.get('/invoices');
  return response.data;
};

export default API;