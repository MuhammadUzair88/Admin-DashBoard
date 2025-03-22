import React, { useEffect } from "react";
import { useApi } from "../context/ApiContext";

const Performance = () => {
  const { performance, fetchPerformance } = useApi();
  const userId = "63701cc1f03239b7f700000e"; // Change dynamically if needed

  useEffect(() => {
    fetchPerformance(userId);
  }, [fetchPerformance, userId]);

  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold text-white">PERFORMANCE</h1>
      <p className="text-gray-300">
        Track your Affiliate Sales Performance Here
      </p>
      <div className="mt-10 h-[75vh] overflow-auto bg-gray-900 p-4 rounded-lg shadow-md">
        {!performance ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700 text-left text-gray-300">
                <th className="p-3 border border-gray-600">ID</th>
                <th className="p-3 border border-gray-600">User ID</th>
                <th className="p-3 border border-gray-600">Created At</th>
                <th className="p-3 border border-gray-600"># of Products</th>
                <th className="p-3 border border-gray-600">Price</th>
              </tr>
            </thead>
            <tbody>
              {performance.map((row) => (
                <tr key={row._id} className="odd:bg-gray-700 even:bg-gray-800">
                  <td className="p-3 border border-gray-600">{row._id}</td>
                  <td className="p-3 border border-gray-600">{row.userId}</td>
                  <td className="p-3 border border-gray-600">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {row.products.length}
                  </td>
                  <td className="p-3 border border-gray-600">
                    ${Number(row.cost).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Performance;
