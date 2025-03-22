import React, { useState } from "react";
import OverviewChart from "../components/OverviewChart";

const OverView = () => {
  const [view, setView] = useState("units");

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold">Overview</h1>
      <p className="text-gray-400">Overview of general revenue and profit</p>

      {/* View Selector */}
      <div className="mt-4 flex items-center space-x-3">
        <label htmlFor="view" className="text-gray-300">
          View:
        </label>
        <select
          id="view"
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="sales">Sales</option>
          <option value="units">Units</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <OverviewChart view={view} />
      </div>
    </div>
  );
};

export default OverView;
