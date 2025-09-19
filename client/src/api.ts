import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data);
  return res.data; 
};

export const getInvoices = async () => {
    const token = localStorage.getItem("token");
  console.log("🔑 Token being sent:", token);
  const { data } = await axios.get(`${BASE_URL}/invoices`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};

export const getInvoiceById = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  const { data } = await axios.get(`${BASE_URL}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

