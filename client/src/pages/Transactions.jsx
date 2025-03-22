import React, { useEffect } from "react";
import { useApi } from "../context/ApiContext";

const Transactions = () => {
  const { fetchTransactionsData, transactions } = useApi();

  // Fetch transactions data on component mount
  useEffect(() => {
    const getTransactions = async () => {
      await fetchTransactionsData();
    };
    getTransactions();
  }, []);

  useEffect(() => {
    console.log(transactions);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-100">Transactions</h1>
      <p className="text-gray-400">List of transactions</p>

      {/* Transactions Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left"># of Products</th>
              <th className="p-3 text-left">Cost</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-300">
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-700">
                  <td className="p-3">{transaction._id}</td>
                  <td className="p-3">{transaction.userId}</td>
                  <td className="p-3">{transaction.createdAt}</td>
                  <td className="p-3">{transaction.products.length}</td>
                  <td className="p-3">${transaction.cost}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400">
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

export default Transactions;
