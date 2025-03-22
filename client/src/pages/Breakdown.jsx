import React from "react";
import BreakDownChart from "../components/BreakDownChart";

const Breakdown = () => {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div>
        <h1 className="text-3xl text-blue-100 tracking-tight font-bold">
          BREAKDOWN
        </h1>
        <p className="text-sm text-gray-600">Breakdown of Sales By Category</p>
      </div>
      <div className="flex items-center justify-center mt-7">
        <BreakDownChart />
      </div>
    </div>
  );
};

export default Breakdown;
