import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvoices, getInvoiceById } from "../api";
import { 
  FaPlus, FaBell, FaSun, FaUserCircle, FaHome, FaFileInvoiceDollar, FaRegMoneyBillAlt, FaRegFileAlt, FaChartLine 
} from "react-icons/fa";
import { HiOutlineSearch, HiMenu } from "react-icons/hi";

const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-3 rounded-xl transition-colors duration-200 ${
      active ? "bg-blue-700 text-white shadow-lg" : "text-blue-900 hover:bg-blue-300"
    }`}
  >
    {icon}
    <span className="ml-3 font-medium text-sm">{text}</span>
  </a>
);

const Invoices: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  const { data: invoiceDetails } = useQuery({
    queryKey: ["invoice", selectedInvoiceId],
    queryFn: () => (selectedInvoiceId ? getInvoiceById(selectedInvoiceId) : Promise.resolve(null)),
    enabled: !!selectedInvoiceId,
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error loading invoices</div>;

  return (
    <div className="flex h-screen w-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-300 h-full p-6 rounded-tr-3xl rounded-br-3xl shadow-lg flex flex-col justify-between">
        <div>
          <div className="bg-white p-5 rounded-2xl shadow-md text-center text-blue-800 font-bold text-xl mb-8 border border-blue-300">
            LOGO
          </div>
          <nav className="flex-1">
            <ul className="space-y-3">
              <li><NavItem icon={<FaHome />} text="Home" /></li>
              <li><NavItem icon={<FaFileInvoiceDollar />} text="Invoices" active /></li>
              <li><NavItem icon={<FaRegMoneyBillAlt />} text="Bills" /></li>
              <li><NavItem icon={<FaRegFileAlt />} text="Expenses" /></li>
              <li><NavItem icon={<FaChartLine />} text="Reports" /></li>
            </ul>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 mt-4 rounded-xl text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 mb-6 rounded-2xl bg-blue-200 shadow-md">
          <div className="flex items-center space-x-4">
            <button className="text-blue-900 hover:text-blue-700"><HiMenu size={24} /></button>
            <span className="text-blue-900 font-medium text-sm">Home</span>
            <span className="text-blue-800 font-semibold text-sm">/ Invoices</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            </div>
            <FaBell className="text-blue-800 hover:text-blue-600 cursor-pointer" />
            <FaSun className="text-blue-800 hover:text-blue-600 cursor-pointer" />
            <FaPlus className="text-white bg-blue-700 p-3 rounded-full hover:bg-blue-800 shadow-md cursor-pointer" />
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUserCircle size={24} />
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-blue-200 rounded-xl shadow-lg z-10">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-blue-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="flex-1 overflow-auto bg-blue-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Invoices</h2>
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-blue-900 text-white rounded-t-lg">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Payee</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {invoices.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="bg-white hover:bg-blue-100 rounded-2xl transition-colors shadow-sm cursor-pointer"
                  onClick={() => setSelectedInvoiceId(invoice.id)}
                >
                  <td className="p-4">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="p-4">{invoice.vendorName}</td>
                  <td className="p-4">{invoice.description}</td>
                  <td className="p-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td className="p-4 text-right">${invoice.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide ${
                        invoice.status === "Paid"
                          ? "bg-green-200 text-green-800"
                          : invoice.status === "Overdue"
                          ? "bg-red-200 text-red-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Selected Invoice Details */}
          {invoiceDetails && (
            <div className="mt-6 p-4 bg-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Invoice Details</h3>
              <p><strong>Payee:</strong> {invoiceDetails.vendorName}</p>
              <p><strong>Description:</strong> {invoiceDetails.description}</p>
              <p><strong>Amount:</strong> ${invoiceDetails.amount.toFixed(2)}</p>
              <p><strong>Status:</strong> {invoiceDetails.status}</p>
              <p><strong>Due Date:</strong> {new Date(invoiceDetails.dueDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Invoices;
