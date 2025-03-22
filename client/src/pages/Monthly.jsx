import React, { useEffect } from "react";
import { useApi } from "../context/ApiContext";

const Monthly = () => {
  const { fetchOverallStats, overallStats } = useApi();

  useEffect(() => {
    fetchOverallStats();
  });

  useEffect(() => {
    console.log(overallStats?.monthlyData); // Use optional chaining to prevent errors
  }, [overallStats]); // Ensure it runs when `overallStats` updates

  const formattedData = [];

  return <div>Monthly</div>;
};

export default Monthly;
