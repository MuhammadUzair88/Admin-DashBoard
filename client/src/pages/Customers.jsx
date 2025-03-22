import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";

const Customers = () => {
  const { fetchCustomersData, CustomerData } = useApi();
  const [customers, setCustomers] = useState([]);

  // Fetch customer data on component mount
  useEffect(() => {
    const getCustomers = async () => {
      await fetchCustomersData();
    };
    getCustomers();
  }, []);

  // Update state when CustomerData changes
  useEffect(() => {
    if (CustomerData && Array.isArray(CustomerData)) {
      setCustomers(CustomerData);
    }
  }, [CustomerData]);

  // Function to format phone number
  const formatPhoneNumber = (phone) => {
    return phone.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div className="p-6">
      {/* Title Section */}
      <div className="text-2xl font-bold text-gray-100">Customers</div>
      <p className="text-gray-400">List of Customers</p>

      {/* Table Container */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Occupation</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-gray-900 text-gray-300">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id} className="border-b border-gray-700">
                  <td className="p-3">{customer._id}</td>
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">
                    {formatPhoneNumber(customer.phoneNumber)}
                  </td>
                  <td className="p-3">{customer.country}</td>
                  <td className="p-3">{customer.occupation}</td>
                  <td className="p-3">{customer.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-400">
                  Loading or No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
